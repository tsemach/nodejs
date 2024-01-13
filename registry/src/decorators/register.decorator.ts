import { Registry, Indicator } from '../registry'
import { Construct } from '../types';

/** 
 * https://www.theserverside.com/tutorial/Understanding-the-TypeScript-method-decorator
 * 
 * @param name  event name
 * @param method  the method activate on the class
 * @usage ()
*/
export function Register(group: string, name: string): any {  
  function wrapper(target: any) {    
    const original = target;
        
    Registry.instance.add(new Indicator(group, name), target)
    
    return original
  }  

  return wrapper  
}