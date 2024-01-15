import { Register } from '../decorators'

@Register('group', 'provider', { useMock: true})
export class ProviderMock {
  public count = 0
  constructor() {    
  }

  print() {
    console.log("I am Provider Mock class")
  }

  inc() {
    this.count++
  }
  
  name() {
    return this.constructor.name
  }
}