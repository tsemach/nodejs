import { ClsService } from "./cls-service"

export interface LoggerOptions {
  withConsole?: boolean
  withFileTranspot?: boolean
  withUDSTransport?: boolean
  clsService?: ClsService
  transports?: {
    file?: {
      filename?: string
      level?: string      
      maxsize?: number | string
      maxFiles?: number                 
    }
  }
}