export class Worker {

  constructor() {    
  }

  print() {
    console.log("I am Worker class")
  }

  name() {
    return this.constructor.name
  }
}