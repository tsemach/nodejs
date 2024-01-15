import { Registry, Indicator } from '../registry'
import { RegistryOptions } from '../types';

const defaultRegistryOptions: RegistryOptions = {
  scope: 'singletone',
  useMock: false
}

/** 
 * https://www.theserverside.com/tutorial/Understanding-the-TypeScript-method-decorator
 * 
 * @param name  event name
 * @param method  the method activate on the class
 * @usage ()
*/
export function Register(group: string, name: string, options = defaultRegistryOptions): any {  
  function wrapper(target: any, propertyKey: string, descriptor: PropertyDescriptor) {    
    const original = target;
    
    if (options.useMock) {
      Registry.instance.mock(new Indicator(group, name), target, options)  
    }
    Registry.instance.add(new Indicator(group, name), target, options)
    
    return original
  }  

  return wrapper  
}