import { EventPool } from './event-pool'

export function event(name:string, method: string): any {  
  function wrapper(target: any) {    
    const original = target;
        
    let instance: any
    async function fire(signal: string, ...args: any[]) {     
      return instance[method](...args)      
    }

    // define a new constructor that register the target
    function newConstructor(...args: any[]) { 
      instance = new original(...args);
      EventPool.instance.register(instance, [name])
      
      return instance;
    }    
    
    newConstructor.prototype = original.prototype;
    newConstructor.prototype.fire = fire.bind(newConstructor)
    
    return newConstructor;
  }  

  return wrapper  
}

export interface EventsType {
  name: string
  method: string
} 

export function events(__events: EventsType[]): any {  
  function wrapper(target: any) {    
    const original = target;

    let instance: any
    
    async function fire(signal: string, ...args: any[]) {
      return await Promise.all(this.__events.filter((e: EventsType) => e.name === signal).map((e: EventsType) => instance[e.method](...args)))
    }

    // define a new constructor that register the target
    function newConstructor(...args: any[]) { 
      instance = new original(...args);
      const allevent = [...new Set(__events.map((e: EventsType) => e.name))]   
      EventPool.instance.register(instance, allevent)
      
      return instance;
    }    
    
    newConstructor.prototype = original.prototype;
    newConstructor.prototype.fire = fire.bind(newConstructor)
    newConstructor.__events = __events
    
    return newConstructor;
  }  

  return wrapper  
}

// export const shutdown2 = function(method: string) { events('shutdown', method)}
export const shutdown = (method: string) => event('shutdown', method)

//=======================================================================================================
export function events1(_names: string[]): any {
  return async (target: { new (...args: any[]): any }) => {  

    console.log("EEEEEEEEEEEEEEEEEEEEE EVENTS CALLED")    
    const called = new target()
    EventPool.instance.register(called, _names)
    // Application.instance.register(_names)

    return target
  };
}

export function events2(name:string): any {  
  function wrapper(target: any) {    
    const original = target;

    // define a new constructor that register the target
    function newConstructor(...args: any[]) {          
      const instance = new original(...args);
      EventPool.instance.register(instance, [name])

      return instance;
    }
    newConstructor.prototype = original.prototype;
    
    return newConstructor;
  }  

  return wrapper  
}

export function events3(name:string): any {  
  function wrapper(target: any) {    
    const original = target;

    // let event: any
    let instance: any
    async function fire(signal: string) {     
      console.log("SSSSSSS IN DECORATE:, signale", signal)   
      if (signal === 'shutdown') {
        console.log("SSSSSSS IN DECORATE:, signale", signal)   
        return instance.onShutdownEvent(signal)
      }
    }

    // define a new constructor that register the target
    function newConstructor(...args: any[]) { 
      instance = new original(...args);
      // event = instance
      // instance.prototype.fire = fire.bind(instance)
      EventPool.instance.register(instance, [name])
      
      return instance;
    }    
    
    newConstructor.prototype = original.prototype;
    newConstructor.prototype.fire = fire.bind(newConstructor)
    
    return newConstructor;
  }  

  return wrapper  
}

export function shutdown2(method: string): any {  
  function wrapper(target: any) {    
    const original = target;

    // let event: any
    let instance: any
    async function fire(signal: string) {     
      console.log("SSSSSSS IN DECORATE:, signale", signal)   
      if (signal === 'shutdown') {
        console.log("SSSSSSS IN DECORATE:, signale", signal)   
        //return instance.onShutdownEvent(signal)
        return instance[method](signal)
      }
    }

    // define a new constructor that register the target
    function newConstructor(...args: any[]) { 
      instance = new original(...args);
      // event = instance
      // instance.prototype.fire = fire.bind(instance)
      EventPool.instance.register(instance, ['shutdown'])
      
      return instance;
    }    
    
    newConstructor.prototype = original.prototype;
    newConstructor.prototype.fire = fire.bind(newConstructor)
    
    return newConstructor;
  }  

  return wrapper  
}
