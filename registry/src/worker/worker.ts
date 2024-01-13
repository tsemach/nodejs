import { IncomingMessage } from "http"

export class Worker {
  public count = 0

  constructor() {    
  }

  print() {
    console.log("I am Worker class, count:", this.count)
  }

  inc() {
    this.count++
  }

  name() {
    return this.constructor.name
  }
}