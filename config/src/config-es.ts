import { Config, ClassMethodsRecord } from "./config"

export interface ConfigESParamsType {
  host: string
  port: number
}

export class ConfigES extends Config<ConfigESParamsType> {
  constructor() {
    super()

    this._params.host = 'tsemach.org'
    this._params.port = 8080

    this.defineAll()
  }   

  params() {
    return this._params
  }

  static new() {
    return (new ConfigES() as unknown ) as ClassMethodsRecord<ConfigES> & ConfigESParamsType & { _params: ConfigESParamsType }    
  }
}

