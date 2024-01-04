export interface ConfigParamsSchemeProperyType {
  name: string
  type: string
}

export type ConfigParamsSchemeType = ConfigParamsSchemeProperyType[]

const a: ConfigParamsSchemeType = [
  {
    name: 'host',
    type: 'string'
  },
  {
    name: 'port',
    type: 'number'
  }

]

export interface ConfigParamsType {
  host: string
  port: number
}