import correlator from "correlation-id";

export function correlation(id?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // console.log("Target, ", target)
    // console.log("propertyKey, ", propertyKey, typeof propertyKey)
    // console.log("descriptor, ", descriptor)
    // console.log("arargumentsgs, ", arguments)  
    
    descriptor.value = async function (...args: any[]) { 
      const [ req, res] = args
      
      id = id ?? req.correlation
      correlator.withId(id as string, async () => {      
        return originalMethod.apply(this, args);        
      })
    };

    return descriptor;
  }
}
