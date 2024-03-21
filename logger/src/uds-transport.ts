import Transport  from 'winston-transport'
import { UDSClient } from './uds-client'

type Callback = () => void

interface InfoType {
  level: string
  message: any
  [ key: string | symbol ]: any    
}

interface UnixDomainSocketTransportOptions extends Transport.TransportStreamOptions {
  sockfile: string
  udcclient: UDSClient
}

export class UnixDomainSocketTransport extends Transport {
  private _options: UnixDomainSocketTransportOptions

  constructor(_options: UnixDomainSocketTransportOptions) {
    super(_options);
    
    this._options = _options    
  }

  log(info: InfoType , callback: Callback) {       
    try {
      const sym = Object.getOwnPropertySymbols(info).find( (s) => s.description === "message");      
      if (sym) {
        this._options.udcclient.send(info[sym])
      }      
    }
    catch (e) {
      console.error('error on sending data to log server')
    }
    
    callback();
  }   
}
