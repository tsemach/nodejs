import { duration } from "../../src/decorators"
import { utils } from '../../src/common'

export function durationa(message: string) {
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
      console.log(`[duration] ${message}, took: ${seconds} sec`)      

      return result;
    };

    return descriptor;
  }
}

function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
class Stam {
  @duration('duration')
  async duratiionMain() {
    console.info("going to call to util.sleep")
    await utils.sleep(1000)
  }
}

async function duratiionMain()  {
  await new Stam().duratiionMain()
}



