import { ConfigPGTypes } from "../types"
import { ConfigDefinctions, ClassMethodsRecord } from "./config-defintions"

export interface ConfigESParamsType {
  host: string
  port: number
}

export class ConfigPG extends ConfigDefinctions<ConfigPGTypes> {
  constructor() {
    super()

    this._params.host = process.env.POSTGRES_HOST ?? 'localhost'
    this._params.port = +process.env.POSTGRES_PORT ?? 5432
    this._params.username = process.env.POSTGRES_USER ?? 'postgres'
    this._params.password = process.env.POSTGRES_PASSWORD ?? 'postgres'
    this._params.database = process.env.POSTGRES_DATABASE ?? 'postgres'

    this.defineAll()
  }   

  params() {
    return this._params
  }

  static new() {
    return (new ConfigPG() as unknown ) as ClassMethodsRecord<ConfigPG> & ConfigPGTypes & { _params: ConfigPGTypes }    
  }
}

