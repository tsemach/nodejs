import { workerData } from "worker_threads"
import { Constructor, Provider, RegistryOptions } from "../types"
import { Indicator } from "./indicator"
import { isIndicator } from "./indicator-guards"
import { RegistryError, RegistryScopeError } from "./registry-error"
import { Context } from "mocha"

// Type 'Worker' provides no match for the signature 'new (...args: any[]): Worker'.ts(2344)
const defaultRegistryOptions: RegistryOptions = {
  scope: 'singletone'
}

interface ProviderParams {
  constuctor: Constructor
  options: RegistryOptions
}

export class Registry {
  private static _instance: Registry
  private instasnces = new Map<string, any>()
  private providers = new Map<string, ProviderParams>()

  private constructor() {    
  }

  public static get instance() {
    return Registry._instance || (Registry._instance = new Registry())
  }

  add(indicator: Indicator, provider: Constructor, options = defaultRegistryOptions) {    
    this.providers.set(indicator.toString(), { constuctor: provider, options })
  }

  get<T = any>(_indicator: string | Indicator, ...args: any[]) {
    const indicator = this.getIndicator(_indicator)
    
    if ( ! this.has(indicator) ) {
      throw new RegistryError(`unable to find worker: ${indicator.toString()}`)
    }    
    const params = this.providers.get(indicator.toString())

    if (params.options.scope === 'singletone') {
      if (this.hasInstance(indicator)) {
        return this.instasnces.get(indicator.toString()) as T
      }

      const instance = new params.constuctor(...args) as T
      this.instasnces.set(indicator.toString(), instance)

      return instance as T      
    }
    if (params.options.scope === 'request') {
      return new params.constuctor(...args) as T        
      // return new (this.providers.get(indicator.toString()))() as T
    }

    throw new RegistryScopeError('unknown scope')
  }
  
  has(indicator: string | Indicator) {    
    if (isIndicator(indicator)) {
      return this.providers.has(indicator.toString())
    }

    return this.providers.has(indicator)
  }

  hasInstance(indicator: string | Indicator) {    
    if (isIndicator(indicator)) {
      return this.instasnces.has(indicator.toString())
    }

    return this.instasnces.has(indicator)
  }

  private getIndicator(indicator: string | Indicator) {
    if (isIndicator(indicator) ) {      
      return indicator
    }

    return Indicator.parse(indicator)
  }
}