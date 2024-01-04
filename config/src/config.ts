export class Config<T=any> {
  // private _params: ConfigParams = {} as any
  protected _params: T = {} as any

  constructor() {      
    // this.defineGetterSetter('port')          
    // this.defineGetterSetter('host')

    // this._params['host'] = 'tsemach.org'
    // this._params.port = 8080
  }
  
  init(_params: Partial<T>) {
    for (const key of Object.keys(_params)) {
      this._params[key] = _params[key] ? _params[key] : this._params[key]
    }
    this.defineAll()
    // Object.keys(this._params).forEach(prop => this.defineGetterSetter(prop))              
  }
  
  protected defineAll() {
    Object.keys(this._params).forEach(prop => this.defineGetterSetter(prop))    
  }

  protected defineGetterSetter(prop: string) {
    var get = Function("return this._params['" + prop + "']")
    var set = Function("newValue", "this._params['" + prop + "'] = newValue")
    var handler = { 'get': get, 'set': set, enumerable: true, configurable: true }
    Object.defineProperty(this, prop, handler as any)
  }  
}

export function instance<C, P>(c: new (...args: unknown[]) => C) {
  return (new c() as unknown ) as P & { _params: P }
}
