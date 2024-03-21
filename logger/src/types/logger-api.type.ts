import winston from "winston";

export interface LoggerAPI {
  silly(message: any, ...args: any[]): winston.Logger;
  debug(message: any, ...args: any[]): winston.Logger;
  info(message: any, ...args: any[]): winston.Logger;
  warn(message: any, ...args: any[]): winston.Logger;
  error(message: any, ...args: any[]): winston.Logger;
  fatal(message: any, ...args: any[]): winston.Logger;
}

