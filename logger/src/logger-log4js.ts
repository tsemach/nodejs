require('source-map-support').install({
	environment: 'node'
});

// var log4js = require('log4js'),
import log4js from 'log4js'
var  path = require('path')

var PROJECT_ROOT = path.join(__dirname, '../..')

const LOG_LEVEL = process.env.IOT_LOG_LEVEL || 'debug'

log4js.configure({
  appenders: { 
    'out': { type: 'stdout' }
    // 'users': { type: 'file', filename: 'logs/users.log', maxLogSize: 12328960 }
  },
  categories: { 
    // default: { appenders: ['out', 'users'], level: 'debug' },
    default: { appenders: ['out'], level: LOG_LEVEL }
    //'users': { appenders: ['users'], level: 'info' }
  }
});

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo(stackIndex: any) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  var stacklist = (new Error()).stack.split('\n').slice(3)
  
  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi
  
  var s = stacklist[stackIndex] || stacklist[0]
  var sp = stackReg.exec(s) || stackReg2.exec(s)
  
  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n')
    }
  }
}

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments(args: any) {  
  args = Array.prototype.slice.call(args)
  const stackInfo = getStackInfo(1)  
  
  if (stackInfo) {
    // get file path relative to project root
    var calleeStr = '[' + stackInfo.relativePath + ':' + stackInfo.line + ']' + ' [' + stackInfo.method + ']';

    if (typeof (args[0]) === 'string') {
      args[0] = calleeStr + ' ' + args[0]
    } 
    else {
      args.unshift(calleeStr)
    }
  }
  
  return args
}

function getLogger(subject: string) {
  const _logger = log4js.getLogger(subject);

  return {
    trace: function (...args: any[]) {
      _logger.trace.apply(_logger, formatLogArguments(arguments))
    },
    debug: function (...args: any[]) {
      _logger.debug.apply(_logger, formatLogArguments(arguments))
    },
    info: function (...args: any[]) {
      _logger.info.apply(_logger, formatLogArguments(arguments))
    },    
    warn: function(...args: any[]) {
      _logger.warn.apply(_logger, formatLogArguments(arguments))
    },
    error: function (...args: any[]) {
      _logger.error.apply(_logger, formatLogArguments(arguments))
    },
    fatal: function (...args: any[]) {
      _logger.fatal.apply(_logger, formatLogArguments(arguments))
    },
    getLogger() {
      return this
    }
  };
}

export default {
  getLogger,
  get: (subject: string) => {
    return getLogger(subject)
  }
}

// function(subject: string) {
//   const _logger = log4js.getLogger(subject);

//   return {
//     trace: function (...args: any[]) {
//       _logger.trace.apply(_logger, formatLogArguments(arguments))
//     },
//     debug: function (...args: any[]) {
//       _logger.debug.apply(_logger, formatLogArguments(arguments))
//     },
//     info: function (...args: any[]) {
//       _logger.info.apply(_logger, formatLogArguments(arguments))
//     },    
//     warn: function(...args: any[]) {
//       _logger.warn.apply(_logger, formatLogArguments(arguments))
//     },
//     error: function (...args: any[]) {
//       _logger.error.apply(_logger, formatLogArguments(arguments))
//     },
//     fatal: function (...args: any[]) {
//       _logger.fatal.apply(_logger, formatLogArguments(arguments))
//     },
//     getLogger() {
//       return this
//     }
//   };
// }

// export default function(subject: string) {
//   const _logger = log4js.getLogger(subject);

//   return {
//     trace: function (...args: any[]) {
//       _logger.trace.apply(_logger, formatLogArguments(arguments))
//     },
//     debug: function (...args: any[]) {
//       _logger.debug.apply(_logger, formatLogArguments(arguments))
//     },
//     info: function (...args: any[]) {
//       _logger.info.apply(_logger, formatLogArguments(arguments))
//     },    
//     warn: function(...args: any[]) {
//       _logger.warn.apply(_logger, formatLogArguments(arguments))
//     },
//     error: function (...args: any[]) {
//       _logger.error.apply(_logger, formatLogArguments(arguments))
//     },
//     fatal: function (...args: any[]) {
//       _logger.fatal.apply(_logger, formatLogArguments(arguments))
//     },
//     getLogger() {
//       return this
//     }
//   };
// }


