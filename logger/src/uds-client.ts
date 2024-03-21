import * as utils from './utils'
import { NetConnectOpts } from "net";
import net from 'net';
import { Config } from './config'
import { UDCOptions } from './types';

export class UDSClient {
  private _options: UDCOptions  
  private _client: net.Socket
  private _isConnected = false

  constructor(_options: UDCOptions) {    
    this._options = _options
  }

  connect() {
    if ( ! this.options.enable || process.env.NODE_ENV === 'local' ) {
      return
    }

    this._client = net.createConnection(this.options.sockfile);  
    this._client.on('connect', () => {
      console.log('[logger:UDSClient] connected to unix domain server');
                
      this._isConnected = true
    });    

    this._client.on('end', async () => {
      console.log('[logger:UDSClient] disconnected from unix domain server');

      this._isConnected = false
      await utils.sleep(1000)
      this.connect()
    });
    
    this._client.on('error', async (err) => {
      console.error('[UDSClient:on] error:', err.message);

      this._isConnected = false
      await utils.sleep(1000)
      this.connect()
    });    
  }

  send(data: any) {
    if (this.options.enable && this._isConnected) {
      this._client.write(typeof data === 'string' ? data : JSON.stringify(data))
    }    
  }

  get isConnected() {
    return this._isConnected
  }

  get options() {
    return this._options
  }
}

// const client = net.createConnection(socketPath);
// let connected: boolean = false

// client.on('connect', () => {
//   console.log('Connected to Unix domain server');

//   // Send data to the server
//   client.write('Hello from the client!');
//   client.write('Logger mesage' + JSON.stringify({name: 'tsemach'}));
//   connected = true
// });

// client.on('data', (data) => {
//   console.log('Received data from server:', data.toString());
//   client.write('Hello from the client!');
// });


// client.on('end', () => {
//   console.log('Disconnected from Unix domain server');
//   this._isConnected = false
// });

// client.on('error', (err) => {
//   console.error('Error:', err);
// });

// const user = { name: 'tsemach' }
// setInterval(() => {
//   if (connected) {
//     client.write(JSON.stringify(user))
//   }
// }, 1000);
