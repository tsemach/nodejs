import { EventEmitter } from 'node:events'
import { utils } from './utils/utils'
import { Valve } from './valve.enum'

export class AsyncQueue<T> {
  private _limit: number
  private _data: T[] = []  
  private _valve = Valve.OPEN
  private readonly _getEmitter = new EventEmitter()
  private readonly _putEmitter = new EventEmitter()

  constructor(limit?: number) {    
    if (limit) {
      this._limit = limit
    }
  }

  async put(data: T | T[]) {
    if (this.isArrayGuard(data)) {
      await this._waitForSpace(data.length)
      
      data.forEach(e => this.data.push(e))
      this._putEmitter.emit('put', data.length)

      return
    }
    
    await this._waitForSpace(1)
    
    this.data.push(data)
    this._putEmitter.emit('put', 1)
  }

  async get(needed = 1): Promise<T | T[]> {    
    await this._waitForData(needed)
    
    if (needed === 1) {
      const elem = this.data.shift()
      this._getEmitter.emit("get", needed);

      return elem
    }

    const result = []
    for (const i of utils.range(0, needed)) {
      result.push(this.data.shift())
    }
    this._getEmitter.emit("get", needed);
 
    return result
  }

  private _waitForGetEvent<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      const success = (val: T) => {
        this._getEmitter.off("error", fail);
        
        resolve(val);        
      };
      const fail = (err: Error) => {
        this._getEmitter.off('get', success);
        reject(err);
      };

      this._getEmitter.once('get', success);
      this._getEmitter.once("error", fail);
    });
  }  

  private _waitForPutEvent<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      const success = (val: T) => {
        this._putEmitter.off("error", fail);
        
        resolve(val);
      };
      const fail = (err: Error) => {
        this._putEmitter.off('put', success);
        reject(err);
      };

      this._putEmitter.once('put', success);
      this._putEmitter.once("error", fail);
    });
  }  

  private async _waitForSpace(needed: number) {
    while ( ! this.hasSpace(needed) ) {
      await this._waitForGetEvent()
    }    
  }

  private async _waitForData(needed: number) {
    while (this.data.length < needed) {  
      await this._waitForPutEvent()     
    }
  }


  public hasSpace(needed = 1) {
    if ( ! this._limit && this._limit < 0 ) {
      return true
    }

    return this._data.length + needed <= this._limit
  }
 
  private isArrayGuard(data: T | T[]): data is Array<T> {
    return Array.isArray(data)
  }

  get size() {
    return this._data.length
  }

  private get data() {
    return this._data
  }

  private get limit() {
    return this._limit
  }

}