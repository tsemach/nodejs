import winston from "winston";
import util from 'util';
import chalk from 'chalk';
import DailyRotateFile from 'winston-daily-rotate-file'
import { correlator, ClsService } from 'fms-cls'  
import { extractCallerInfo, compact, defineProperty } from './utils'
import { UnixDomainSocketTransport } from './uds-transport'
import { LoggerAPI, logLevels, LoggerOptions } from './types';
import { UDSClient } from "./uds-client";
import { Config } from "./config";
import { utils } from './utils'

type FieldValue = { [name: string]: any }
type ObjectValue = { [name: string]: any }

const { NODE_ENV, MODULE_NAME } = process.env

let defaultLoggerOptions: LoggerOptions = {
  withConsole: true,
  withFileTranspot: false,
  withUDSTransport: false  
};

(function() {
  try {
    utils.deleteLogsFiles()
  }
  catch (e) {
    console.log(e)
  }
})();

const ctx = new chalk.Instance({level: 2});

export const CORRELATION_DEFAULT_NAME = 'correlationId'

export class Logger implements LoggerAPI {
  private _wlogger: winston.Logger;
  private _options: LoggerOptions
  private _category: string
  private static fields = new Map<string, FieldValue>()
  private static udcclient = new UDSClient({ sockfile: Config.sockfile, enable: defaultLoggerOptions.withUDSTransport })
  private static clsService: any
  public static readonly FMS_CLS_ID = 'x-request-id'
  public static readonly CORRELATION_ID_HEADER = Logger.FMS_CLS_ID

  constructor(_category: string, _options?: LoggerOptions) {
    this._category = _category
    this._options = { ...defaultLoggerOptions, ..._options }
    this.build()
  }

  public static get(_category: string, options = defaultLoggerOptions) {
    if ( options.withUDSTransport && ! Logger.udcclient.isConnected ) {
      Logger.udcclient.connect()
    }
    return new Logger(_category, options)
  }
  private build() {      
    this._wlogger = winston.createLogger({  
      levels: logLevels,
      level: process.env.LOG_LEVEL || 'debug',
      defaultMeta: { category: this._category },
      transports: [                    
        ...(this.options.withConsole ? [NODE_ENV === 'local' ? this.getTransportConsoleLocal() : this.getTransportConsole()] : []),
        ...(this.options.withFileTranspot ? [this.getTransportFile()] : []),
        ...(this.options.withUDSTransport ? [this.getUnixDomainSockerTransport()] : [])
      ]      
    });
  }
  
  private getLineColor(level: string) {
    
  }

  private getTransportConsole() {            
    const COLORS = { debug: 'white', info: 'green', warn: 'yellow', error: 'red', fatal: 'red' }   

    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),   // string interpolation
        winston.format.label(),   // add custom label
        winston.format.errors({ stack: true}),        
        winston.format.simple(),
        winston.format.timestamp(),        
        winston.format.printf((info) => {
          const category = info.category ?? ''
          const location = info.caller?.location ?? ''
          const method = info.caller?.method ?? ''
          // const level = info.level === '[31merror[39m' ? chalk.bold.bgRed(info.level) : info.level
          const correlationId = this.getCorrelationId(CORRELATION_DEFAULT_NAME)
          
          // const head = info.level === 'error' ? chalk.hex('#b32d00') : chalk.hex('#006666')
          // const head = info.level === 'error' ? chalk.hex('#e50e0e') : chalk.hex('#04a6a6')
          // const head = info.level === 'error' ? chalk.hex('#e50e0e') : chalk.hex('#007777')
          // const head = info.level === 'error' ? chalk.hex('#e50e0e') : chalk.hex('#005252')
          // const head = info.level === 'error' ? chalk.hex('#e50e0e') : chalk.hex('#005252')
          // const head = info.level === 'error' ? ctx.hex('#CE0C0C') : ctx.hex('#006969')                              
          // if (info.level === 'info') {
          //   const head = ctx.hex('#009999')
          //   // return `${head(`${info.timestamp} [${correlationId}] [${info.level}] [${category}] ${location} [${method}]`)} ${chalk.white(info.message)}`
          // }
          // let head = ctx.hex('#009999')
          // let head = ctx.hex('#00dff9')
          // if (info.level === "\u001b[37mdebug\u001b[39m") ctx.hex('#ffffff')
          
          // return `${head(`${info.timestamp} [${correlationId}] [${info.level}]`)} [${category}] ${location} [${method}] ${chalk.white(info.message)}`
          return `${info.timestamp} [${correlationId}] [${info.level}] [${category}] ${location} [${method}] ${chalk.white(info.message)}`
        }),        
        winston.format.colorize({ all: true, message: true, colors: COLORS }),        
      )
    })
  }
  
  private getTransportConsoleLocal() {     
   
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),   // string interpolation
        winston.format.label(),   // add custom label
        winston.format.errors({ stack: true}),        
        winston.format.simple(),
        winston.format.timestamp(),        
        winston.format.printf((info) => {
          const category = info.category ?? ''
          const location = info.caller?.location ?? ''
          const method = info.caller?.method ?? ''
          const level = info.level === '[31merror[39m' ? chalk.bold.bgRed(info.level) : info.level
          const correlationId = this.getCorrelationId(CORRELATION_DEFAULT_NAME)
          
          const head = '#d0d0d0'
          // const head = '#006969'
          // return `${ctx.hex(head)(info.timestamp)} ${ctx.hex(head)(`[${correlationId}]`)} [${info.level}] [${category}] ${location} [${method}] ${chalk.white(info.message)}`
          // return `${info.timestamp} [${correlationId}] [${info.level}] [${category}] ${location} [${method}] ${chalk.white(info.message)}`
          // return `${chalk.hex(head)(info.timestamp)} [${chalk.hex(head)(correlationId)}] [${level}] [${chalk.yellow(category)}] ${chalk.hex('#006969')(location)} [${chalk.magenta.bold(method)}] ${chalk.white(info.message)}`
          return `${chalk.hex(head)(info.timestamp)} [${correlationId}] [${level}] [${chalk.yellow(category)}] ${chalk.hex('#006969')(location)} [${chalk.magenta.bold(method)}] ${chalk.white(info.message)}`
        }),        
        winston.format.colorize({ all: true, message: true, colors: { debug: 'white'} }),        
      )
    })
  }

  private getTransportFile() {      
    return new DailyRotateFile({
      filename: this.options?.transports?.file?.filename ?? (NODE_ENV === 'local' ? `logger-${MODULE_NAME}-%DATE%.log` : `/shared/tmp/fms-logger-${MODULE_NAME}-%DATE%.log`),
      level: this.options?.transports?.file?.level ?? (process.env.LOG_LEVEL ?? 'debug'),
      datePattern: 'YYYY-MM-DD-H',
      maxSize: this.options?.transports?.file?.maxsize ?? '10m', 
      maxFiles: this.options?.transports?.file?.maxFiles ?? 3,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          let output: any = { ...compact({
            timestamp: info.timestamp,
            level: info.level,
            message: info.message,
            location: info.caller?.location,
            method: info.caller?.method,
            category: info.category,
            correlationId: this.getCorrelationId(undefined),
            module: process.env.MODULE_NAME
          }), ...(this.hasFields() && this.getFields()) };
          return JSON.stringify(output);
        })
      )
    })
  }
  
  private getUnixDomainSockerTransport() {
    return new UnixDomainSocketTransport({
      sockfile: process.env.LOGGER_SOCK_FILE ?? '/shared/tmp/logger.sock',
      udcclient: Logger.udcclient,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          let output: any = { ...compact({
            timestamp: info.timestamp,
            level: info.level,
            message: info.message,
            location: info.caller?.location,
            method: info.caller?.method,
            category: info.category,
            correlationId: this.getCorrelationId(undefined),
            module: process.env.MODULE_NAME
          }), ...(this.hasFields() && this.getFields()) };
          return JSON.stringify(output);
        })
      )          
    })
  }

  private getCorrelationId(_default: string | undefined) {
    const clsService = Logger.clsService ?? this._options.clsService

    if (clsService) {
      return clsService.getId()          
    }
  
    return correlator.getId() ?? _default
  }

  public static setDefaultOptions(_options: LoggerOptions) {
    defaultLoggerOptions = { ...defaultLoggerOptions, ..._options }
    Logger.udcclient = new UDSClient({ sockfile: Config.sockfile, enable: defaultLoggerOptions.withUDSTransport })

    if (_options.clsService) {
      Logger.clsService = _options.clsService
    }

    return Logger
  }

  public static setClsService(_clsService: any) {
    Logger.clsService = _clsService

    return this
  }

  public static getClsService() {     
    return Logger.clsService
  }

  setOptions(_options: LoggerOptions) {  
    this._options = { ...defaultLoggerOptions, ..._options }
  }  

  silly(message: any, ...args: any[]) {
    return this._wlogger.silly({ message: util.format(message, ...args), caller: extractCallerInfo()});
  }

  trace(message: any, ...args: any[]) {
    return this._wlogger.debug({ message: util.format(message, ...args), caller: extractCallerInfo()});
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

  addField(k: string, v: any) {
    const correlationId = this.getCorrelationId(CORRELATION_DEFAULT_NAME)        
    const { MODULE_NAME } = process.env

    const setFieldValue = (fieldKey: string) => {
      if ( ! Logger.fields.has(fieldKey) ) {
        Logger.fields.set(fieldKey, defineProperty({}, k, v))  
        return
      }
      const fieldValue = Logger.fields.get(fieldKey)
      fieldValue[k] = v
    }

    if ( ! correlationId ) {      
      setFieldValue(MODULE_NAME)          
      return this
    }

    setFieldValue(correlationId)    
    return this
  }

  f(k: string, v: any) {
    return this.addField(k, v)    
  }

  getField(k: string) {
    const correlationId = this.getCorrelationId(CORRELATION_DEFAULT_NAME)        
    const { MODULE_NAME } = process.env

    const getFieldValue = (fieldKey: string) => {
      if ( ! Logger.fields.has(fieldKey) ) {
        return {}
      }
      return Logger.fields.get(fieldKey)
    }

    return correlationId ? getFieldValue(correlationId)[k] : getFieldValue(MODULE_NAME)[k]
  }

  getFields() {
    const correlationId = this.getCorrelationId(CORRELATION_DEFAULT_NAME) 
    const { MODULE_NAME } = process.env

    return correlationId ? Logger.fields.get(correlationId) : Logger.fields.get(MODULE_NAME)   
  }

  hasFields() {
    const correlationId = this.getCorrelationId(undefined) 
    const { MODULE_NAME } = process.env

    return correlationId ? Logger.fields.has(correlationId) : Logger.fields.has(MODULE_NAME)   
  }

  addObject(o: ObjectValue) {
    for (const [k, v] of Object.entries(o)) {
      this.addField(k, v)
    }
    return this
  }

  o(o: ObjectValue) {
    return this.addObject(o)
  }

  get options() {
    return this._options
  }
} 
