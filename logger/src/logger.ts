import winston from "winston";
import util from 'util';
import chalk from 'chalk';
import { extractCallerInfo, compact } from './utils'
import { UnixDomainSocketTransport } from './uds-transport'
import { LoggerAPI, logLevels, LoggerOptions } from './types';
import appRoot from 'app-root-path';

const fields = new Map<string, any>()

let defaultLoggerOptions: LoggerOptions = {
  withConsole: true,
  withFileTranspot: true,
  withUDSTransport: true  
}

export class Logger implements LoggerAPI {
  private _wlogger: winston.Logger;
  private _options: LoggerOptions
  private _category: string

  constructor(_category: string, _options?: LoggerOptions) {
    this._category = _category
    this._options = { ...defaultLoggerOptions, ..._options }
    this.build()
  }

  public static get(_category: string, options = defaultLoggerOptions) {
    return new Logger(_category, options)
  }

  private build() {    

    const transports = [            
      ...(this.options.withConsole ? [this.getTransportConsole()] : []),
      ...(this.options.withFileTranspot ? [this.getTransportFile()] : []),
      ...(this.options.withUDSTransport ? [this.getUnixDomainSockerTransport()] : [])
    ]

    this._wlogger = winston.createLogger({  
      levels: logLevels,
      level: process.env.LOG_LEVEL || 'debug',
      defaultMeta: { category: this._category },
      transports: [            
        ...(this.options.withConsole ? [this.getTransportConsole()] : []),
        ...(this.options.withFileTranspot ? [this.getTransportFile()] : []),
        ...(this.options.withUDSTransport ? [this.getUnixDomainSockerTransport()] : [])
      ]

      // transports: [            
      //   ...(this.options.withConsole ? [this.getTransportConsole()] : []),
      //   ...(this.options.withFileTranspot ? [this.getTransportFile()] : []),
      //   ...(this.options.withUDSTransport ? [this.getUnixDomainSockerTransport()] : [])
      //   // new UnixDomainSocketTransport({
      //   //   basename: 'aaa.log',
      //   //   // format: winston.format.combine(
      //   //   //   winston.format.timestamp(),
      //   //   //   winston.format.printf((info) => {
      //   //   //     let output: any = {
      //   //   //       timestamp: info.timestamp,
      //   //   //       level: info.level,
      //   //   //       message: info.message,
      //   //   //       location: info.caller?.location,
      //   //   //       method: info.caller?.method,
      //   //   //       category: info.category
      //   //   //     };              
      //   //   //     return JSON.stringify(output);
      //   //   //   })
      //   //   // )          
      //   // })
      // ]
    });
  }

  private getTransportConsole() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),   // string interpolation
        winston.format.label(),   // add custom label
        winston.format.errors({ stack: true}),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf((info) => {                    
          const category = info.category ?? ''
          const location = info.caller?.location ?? ''
          const method = info.caller?.method ??''
          const level = info.level === '[31merror[39m' ? chalk.bold.bgRed(info.level) : info.level
          const correlationId = this.getCorrelationId('correlationId')
                                                            
          // return `${info.timestamp} ${info.level}: ${chalk.cyan(group)} ${chalk.yellow(location)} ${chalk.magenta.bold(method)} ${info.message} `                                
          return `${info.timestamp} ${level} [${chalk.yellow(category)}] [${correlationId}] ${chalk.cyan(location)} [${chalk.magenta.bold(method)}] ${info.message} `
        }),
        
      )
    })
  }

  private getTransportFile() {
    return new winston.transports.File({
      filename: this.options?.transports?.file?.filename ?? 'logger.log',
      level: this.options?.transports?.file?.level ?? (process.env.LOG_LEVEL ?? 'debug'),
      maxsize: this.options?.transports?.file?.maxsize ?? 5*1024*1024, 
      maxFiles: this.options?.transports?.file?.maxFiles ?? 1,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          let output: any = compact({
            timestamp: info.timestamp,
            level: info.level,
            message: info.message,
            location: info.caller?.location,
            method: info.caller?.method,
            category: info.category,
            correlationId: this.getCorrelationId(undefined)
          });
          return JSON.stringify(output);
        })
      )          
    })
  }
  
  private getUnixDomainSockerTransport() {
    return new UnixDomainSocketTransport({
      basename: 'aaa.log',
      // format: winston.format.combine(
      //   winston.format.timestamp(),
      //   winston.format.printf((info) => {
      //     let output: any = {
      //       timestamp: info.timestamp,
      //       level: info.level,
      //       message: info.message,
      //       location: info.caller?.location,
      //       method: info.caller?.method,
      //       category: info.category
      //     };              
      //     return JSON.stringify(output);
      //   })
      // )          
    })
  }

  private getCorrelationId(_default: string | undefined) {
    if (this.options.getCorrelationId) {
      return this.options.getCorrelationId()
    }
    return _default
  }

  public static setDefaultOptions(_options: LoggerOptions) {
    defaultLoggerOptions = { ...defaultLoggerOptions, ..._options }    
  }

  setOptions(_options: LoggerOptions) {
    this._options = { ...defaultLoggerOptions, ..._options }
  }

  silly(message: any, ...args: any[]) {
    return this._wlogger.silly({ message: util.format(message, ...args), caller: extractCallerInfo()});
  }
  
  debug(message: any, ...args: any[]) {
    return this._wlogger.debug({ message: util.format(message, ...args), caller: extractCallerInfo() });
  }  

  info(message: any, ...args: any[]) {      
    return this._wlogger.info({ message: util.format(message, ...args), caller: extractCallerInfo() });
  }

  warn(message: any, ...args: any[]) {
    return this._wlogger.warn({ message: util.format(message, ...args), caller: extractCallerInfo() });
  }
  
  error(message: any, ...args: any[]) {
    return this._wlogger.error({ message: util.format(message, ...args), caller: extractCallerInfo() });
  }

  fatal(message: any, ...args: any[]) {
    return this.log('fatal', {message: util.format(message, ...args), caller: extractCallerInfo()});
  }

  log(level: string, message: any, ...args: any[]) {
    return this._wlogger.error({message, args, caller: extractCallerInfo()});
  }

  private get options() {
    return this._options
  }
} 
