import { Registry, Indicator } from '../registry'

/** 
 * https://www.theserverside.com/tutorial/Understanding-the-TypeScript-method-decorator
 * 
 * @param name  event name
 * @param method  the method activate on the class
 * @usage ()
*/
export function Register(group: string, clazz: string): any {  
  function wrapper(target: any) {    
    const original = target;
        
    let instance = new original();
    Registry.instance.add(new Indicator(group, clazz), instance)
    
    return original
  }  

  return wrapper  
}