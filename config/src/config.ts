export type KeyOfType<Type, ValueType> = keyof {
  [Key in keyof Type as Type[Key] extends ValueType ? Key : never]: any;
};

export type ClassMethods<T> = KeyOfType<T, Function>;
export type ClassMethodsRecord<Type> = Partial<Record<ClassMethods<Omit<Type, 'defineAll'>>, any>>;

export class Config<T=any> {
  protected _params: T = {} as any

  constructor() {      
  }
  
  init(_params: Partial<T>) {
    for (const key of Object.keys(_params)) {
      this._params[key] = _params[key] ? _params[key] : this._params[key]
    }
    this.defineAll()
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
  return (new c() as unknown ) as ClassMethodsRecord<C> & P & { _params: P }
}
