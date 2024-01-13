import { Register } from '../decorators'

@Register('group', 'provider')
export class Provider {

  constructor() {    
  }

  print() {
    console.log("I am Provider class")
  }

  name() {
    return this.constructor.name
  }
}