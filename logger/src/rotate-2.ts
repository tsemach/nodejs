// import fs from 'fs'
// import winston from 'winston'
// import Transport  from 'winston-transport'

// type Callback = () => void

// interface InfoType {
    
// }

// class CustomRotateFile extends Transport {
    
//     constructor(options: Transport.TransportStreamOptions) {
//         super(options);
//         this.rotate = options.rotate || customRotate;
//         this.filename = options.filename;
//         this.currentFilename = this.filename;
//     }

//     log(info: any, callback: Callback) {
//         // Perform file rotation logic
//         if (fs.existsSync(this.currentFilename) && fs.statSync(this.currentFilename).size > 1024) {
//             const newFilename = `${this.filename}.${Date.now()}`;
//             this.rotate(this.currentFilename, newFilename);
//             this.currentFilename = this.filename;
//         }

//         // Write the log to the current file
//         fs.appendFileSync(this.currentFilename, `${info.level}: ${info.message}\n`);

//         // Call the callback once logging is complete
//         callback();
//     }
    
//     rotate(oldFilename, newFilename) {
//       // Rename the old file to the new filename
//       fs.renameSync(oldFilename, newFilename);
//   };
// }

// // Create a logger instance with your custom transport
// const logger = winston.createLogger({
//     transports: [
//         new CustomRotateFile({ filename: 'logs.log' })
//     ]
// });

// // Define your custom rotation logic
// const customRotate = (oldFilename, newFilename) => {
//     // Rename the old file to the new filename
//     fs.renameSync(oldFilename, newFilename);
// };


// // Example usage
// logger.info('This is a log message.');
