import fs from 'fs'
import path, { resolve } from 'path';
import { globSync } from 'glob'
import appRoot from 'app-root-path';

const PROJECT_ROOT = '.'
// const PROJECT_ROOT = path.join(__dirname, '../..')

function getStackInfo (stackIndex = 1) {
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

export  function extractCallerInfo (): {location: string, method: string} {
  const stackInfo: { relativePath: string, line: string, method: string } = getStackInfo(1);
  return { location: stackInfo.relativePath + ':' + stackInfo.line, method: stackInfo.method };
}

export  function formatLogArgumentsOld () {
  // args = Array.prototype.slice.call(args)

  var stackInfo = getStackInfo(1)

  if (stackInfo) {
    // get file path relative to project root
    return stackInfo.relativePath + ':' + stackInfo.line
    // var calleeStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')'

    // if (typeof (args[0]) === 'string') {
    //   args[0] = calleeStr + ' ' + args[0]
    // } else {
    //   args.unshift(calleeStr)
    // }
  }
  return ''
  // return args
}

/**
 * compact: remove null attribute from object
 *
 * @alias o: any object
 */
export function compact(o: any) {
  for (var prop in o) {
    if (o[prop] === null || o[prop] === undefined) {
      delete o[prop];

      continue;
    }   
    if (typeof o[prop] === 'object') {
      o[prop] = compact(o[prop]);
    }   
  }

  return o;
}

export function defineProperty(o: any, name: string | number, value: any, isWriteable = true) {
  Object.defineProperty(o, name, {
    value,
    writable: isWriteable,
    enumerable: true
  });

  return o
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function deleteLogsFiles() {
  const { NODE_ENV, MODULE_NAME } = process.env

  if (!MODULE_NAME) {
    return
  }

  const loggerFile = (NODE_ENV === 'local' ? `${appRoot.path}/logger-${MODULE_NAME}-*` : `/shared/tmp/fms-logger-${MODULE_NAME}-*`)

  const files = globSync(loggerFile);    
  for (const file of files) {
    fs.unlinkSync(file)
  }
}

export const utils = {
  extractCallerInfo,
  sleep,
  compact,
  defineProperty,
  deleteLogsFiles
}