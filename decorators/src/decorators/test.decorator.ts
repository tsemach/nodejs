import Logger from '../common/logger'
const logger = Logger.get('duratiion');

type AsyncFN = () => any

/**
 * @param target 
 * @param propertyKey - function name that the decorator is wrap
 * @param descriptor - an object describe the decorator, decriptor.value is the function instance the decorator wrap
 * @returns none
 * 
 * Usage: 
 * Test("@Schenario")
 * it("some message", async () => {
 *  // add you test here
 * })
 */
export function Test(tag: string, message: string, testfn: AsyncFN) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    console.log("Target, ", target)
    console.log("propertyKey, ", propertyKey, typeof propertyKey)
    console.log("descriptor, ", descriptor)
    console.log("arargumentsgs, ", arguments)  
    // console.log("this.describe:,", source._describe)  
        
    descriptor.value = it(`${tag}: ${message}`, testfn)

    // descriptor.value = async function (...args: any[]) {    
      
    //   const stime = new Date()
    //   const result = await originalMethod.apply(this, args);
    //   const etime = new Date()
    //   var seconds = (etime.getTime() - stime.getTime()) / 1000;
    //   logger.info(`[duration] ${message}, took: ${seconds} sec`)      

    //   return result;
    // };

    return descriptor;
  }
}

/**
 * @param target 
 * @param propertyKey - function name that the decorator is wrap
 * @param descriptor - an object describe the decorator, decriptor.value is the function instance the decorator wrap
 * @returns none
 * 
 * Usage: 
 * Test("@Schenario")
 * it("some message", async () => {
 *  // add you test here
 * })
 */
export function Test1(message: string, testfn: AsyncFN) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    console.log("Target, ", target)
    console.log("propertyKey, ", propertyKey, typeof propertyKey)
    console.log("descriptor, ", descriptor)
    console.log("arargumentsgs, ", arguments)  
    // console.log("this.describe:,", source._describe)  
        
    descriptor.value = it(message, testfn)

    // descriptor.value = async function (...args: any[]) {    
      
    //   const stime = new Date()
    //   const result = await originalMethod.apply(this, args);
    //   const etime = new Date()
    //   var seconds = (etime.getTime() - stime.getTime()) / 1000;
    //   logger.info(`[duration] ${message}, took: ${seconds} sec`)      

    //   return result;
    // };

    return descriptor;
  }
}
