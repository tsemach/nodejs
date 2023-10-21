import { Application } from "../../src/application";
import '../../src/main'

export interface InitiatorOpensType {
  withExit: boolean
}

export class Initiator {
  public static _instance: Initiator;
  private isInit = false

  private constructor() {    
  }

  public static get instance() {
    return Initiator._instance || (Initiator._instance = new Initiator())
  }

  async init(options: InitiatorOpensType = { withExit: true }) {
    this.setOptions(options)
        
    if (!!this.isInit) {
      return
    }

    await Application.instance.bootstrap()
    await Application.instance.init()
  }  
 
  setOptions(options: InitiatorOpensType) {
    Application.instance.withExit = options.withExit
  }

  getIsInit() {    
    return this.isInit
  }
}