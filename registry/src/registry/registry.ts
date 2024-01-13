import { workerData } from "worker_threads"
import { Construct, Provider } from "../types"
import { Indicator } from "./indicator"
import { isIndicator } from "./indicator-guards"
import { RegistryError } from "./registry-error"
import { Context } from "mocha"

// Type 'Worker' provides no match for the signature 'new (...args: any[]): Worker'.ts(2344)

export class Registry {
  private static _instance: Registry
  private providers = new Map<string, Construct>()

  private constructor() {    
  }

  public static get instance() {
    return Registry._instance || (Registry._instance = new Registry())
  }

  add(indicator: Indicator, provider: Construct) {
    this.providers.set(indicator.toString(), provider)
  }

  get<T = any>(_indicator: string | Indicator) {
    const indicator = this.getIndicator(_indicator)
    
    if ( ! this.has(indicator) ) {
      throw new RegistryError(`unable to find worker: ${indicator.toString()}`)
    }
    
    return new (this.providers.get(indicator.toString()))() as T        
  }
  
  has(indicator: string | Indicator) {    
    if (isIndicator(indicator)) {
      return this.providers.has(indicator.toString())
    }

    return this.providers.has(indicator)
  }

  private getIndicator(indicator: string | Indicator) {
    if (isIndicator(indicator) ) {      
      return indicator
    }

    return Indicator.parse(indicator)
  }
}