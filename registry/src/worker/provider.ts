import { Register } from '../decorators'

@Register('group', 'provider')
export class Provider {
  public count = 0
  constructor() {    
  }

  print() {
    console.log("I am Provider class")
  }

  inc() {
    this.count++
  }
  
  name() {
    return this.constructor.name
  }
}