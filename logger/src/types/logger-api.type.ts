import winston from "winston";

export interface LoggerAPI {
  silly(message: any, ...args: any[]): winston.Logger;
  debug(message: any, ...args: any[]): winston.Logger;
  info(message: any, ...args: any[]): winston.Logger;
  warn(message: any, ...args: any[]): winston.Logger;
  error(message: any, ...args: any[]): winston.Logger;
  fatal(message: any, ...args: any[]): winston.Logger;
}

// export const logLevels = {
//   fatal: 0,
//   error: 1,
//   warn: 2,
//   info: 3,
//   debug: 4,
//   trace: 5,
// };
