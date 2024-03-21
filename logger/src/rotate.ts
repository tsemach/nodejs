import fs from 'fs'
import winston from 'winston'
import Transport  from 'winston-transport'

type Callback = () => void
interface InfoType {
  level: string
  message: any
  [ key: string ]: any    
}

interface CustomRotateOption extends Transport.TransportStreamOptions {
  basename: string
}

export class CustomRotateFile extends Transport {
  private _options: CustomRotateOption

  constructor(_options: CustomRotateOption) {
    super(_options);
    
    this._options = _options    
  }

  log(info: InfoType, callback: Callback) {    
    console.log("aaaaaaaaa CustomRotateFile: log, info:", info)
    // if (fs.existsSync(this.currentFilename) && fs.statSync(this.currentFilename).size > 1024) {
    //       const newFilename = `${this.filename}.${Date.now()}`;
    //       this.rotate(this.currentFilename, newFilename);
    //       this.currentFilename = this.filename;
    //   }

    //   // Write the log to the current file
    //   fs.appendFileSync(this.currentFilename, `${info.level}: ${info.message}\n`);

      // Call the callback once logging is complete
      callback();
  }
  
  rotate(oldFilename, newFilename) {
    // Rename the old file to the new filename
    fs.renameSync(oldFilename, newFilename);
  };
}

// // Create a logger instance with your custom transport
// const logger = winston.createLogger({
//     transports: [
//         new CustomRotateFile({ filename: 'logs.log' })
//     ]
// });

// Define your custom rotation logic
const customRotate = (oldFilename, newFilename) => {
    // Rename the old file to the new filename
    fs.renameSync(oldFilename, newFilename);
};


// // Example usage
// logger.info('This is a log message.');
