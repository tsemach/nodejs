export type getCorrelationIdFN = () => string

export interface LoggerOptions {
  withConsole?: boolean
  withFileTranspot?: boolean
  withUDSTransport?: boolean
  getCorrelationId?: getCorrelationIdFN
  transports?: {
    file?: {
      filename?: string
      level?: string      
      maxsize: number
      maxFiles: number                 
    }
  }
}