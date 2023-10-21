import { Events, Callback } from '../types'
import { utils } from '../common'

export class EventPool<T = Events> {
  private static _instance: EventPool;
  private receivers = new Map<string, T[]>() 
  public fired: string[]

  private constructor() {     
  }

  public static get instance(): EventPool {
    return EventPool._instance || (EventPool._instance = new EventPool());    
  }

  async fire(signal: string, ...args: any[]) {
    if ( ! this.receivers.has(signal) ) {
      throw new Error("unknown signal:" + signal);      
    }
    this.fired = await Promise.all(this.receivers.get(signal).map(o => (o as any).fire(signal, ...args)))      

    return this.fired
  }

  register(o: T, events: string[] ) {
    events.map((e) => {      
      if (this.receivers.has(e)) {
        this.receivers.get(e).push(o)
      }

      this.receivers.set(e, [o])
    })    
  }
  
  on(signals: string[], signal: string, cb?: Callback) {
    signals.forEach((s: string) => process.on(s, async () => {
      await EventPool.instance.fire(signal)
      utils.safeCallBack(cb, null)      
    }));
  }
}