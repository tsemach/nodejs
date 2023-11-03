import { Server } from './server'  
import { Config } from '../config'
import { EventPool } from '../events'
import Logger from '../common/logger'
const logger = Logger.get('application')   

export class Application {
  private static _instance: Application;  
  private readonly signals = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGUSR1']
  private _isInit = false
  private _withExit = true

  private constructor() {     
  }

  public static get instance(): Application {
    return Application._instance || (Application._instance = new Application());    
  }
     
  async bootstrap() { 
  }

  start(port?: number) {
    port = (port && port > 0) ? port : Config.listen.port
    logger.info('aws proxy going to listen on:' + port + '!');
    
    Server.instance.listen(port, `aws proxy going is listening on port: ${port} + '!'`)
  }

  async init() {
    if (this._isInit) {
      return 
    }
           
    EventPool.instance.on(this.signals, 'shutdown', (err) => {
      if (this._withExit) {
        process.exit();
      }
    })

    this._isInit = true
  }

  get initStatus() {
    return this._isInit
  }

  set withExit(_withExit: boolean) {
    this._withExit = _withExit
  }

}
