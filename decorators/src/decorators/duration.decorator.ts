import Logger from '../common/logger'
const logger = Logger.get('duratiion');

/**
 * @param target 
 * @param propertyKey - function name that the decorator is wrap
 * @param descriptor - an object describe the decorator, decriptor.value is the function instance the decorator wrap
 * @returns none
 */
export function duration(message: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    console.log("Target, ", target)
    console.log("propertyKey, ", propertyKey, typeof propertyKey)
    console.log("descriptor, ", descriptor)
    console.log("arargumentsgs, ", arguments)  
    
    descriptor.value = async function (...args: any[]) {    
      
      const stime = new Date()
      const result = await originalMethod.apply(this, args);
      const etime = new Date()
      var seconds = (etime.getTime() - stime.getTime()) / 1000;
      logger.info(`[duration] ${message}, took: ${seconds} sec`)      

      return result;
    };

    return descriptor;
  }
}
