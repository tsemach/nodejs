import fs from 'fs'
import { promises as fsp } from 'fs'

/**
 * compact: remove null attribute from object
 *
 * @alias o: any object
 */
function compact(o: any) {
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

async function *scandir(base: string, dir: string) {
  const dirents = await fsp.readdir(`${base}/${dir}`, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = `${dir}/${dirent.name}`;
    if (dirent.isDirectory()) {
      yield* scandir(base, res);
    } 
    else {
      yield res.substring(2);
    }
  }
}

function fileCompareSync(srcname: string, dstname: string) { 
  const srcbuff = fs.readFileSync(srcname)   
  const dstbuff = fs.readFileSync(dstname)

  return Buffer.compare(srcbuff, dstbuff)    
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function trump(str: string, pattern: string) {
  var trumped = ''; 

  if (str && str.length) {
    trumped = str;
    if (pattern && pattern.length) {
      var idx = str.indexOf(pattern);

      if (idx != -1) {
        trumped = str.substring(0, idx);
      }
    }
  }

  return (trumped);
}

function range(start = 0, end = Infinity, step = 1)   {
  let current = start

  const iterable = {
    [Symbol.iterator]: () => {
      return {
        current: current,
        next: function() {
          const value = this.current;
          const done = this.current >= end;
          this.current += step;

          return { value, done };
        }
      };
    }
  };
  return iterable
}

function defineProperty(o: any, name: string | number, value: any, isWriteable = false) {
  Object.defineProperty(o, name, {
    value,
    writable: isWriteable,
    enumerable: true
  });

  return o
}

function loadEnv(filename: string) {
  if ( ! filename || ! fs.existsSync(filename) ) {
    return false
  }

  fs.readFileSync(filename, 'utf-8').split(/\r?\n/).forEach((line) => {
    const [k, v] = line.split('=').map(s => s.trim()) 
    if (k.startsWith('#') || k === '') {
      return
    }
    process.env[k] = v
  })

  return true
}

function sizeOf(o: any) {
  if (typeof o === 'string') {
    return (o as string).length
  }
  if (typeof o === 'number') {
    return 8
  }
  if (Array.isArray(o)) {
    return o.reduce((total, item) =>  total + sizeOf(item), 0)
  }

  if (typeof o === 'object') {   
    return Object.keys(o).reduce((total, item) =>  total + sizeOf(o[item]), 0)    
  }
}

export const utils = { 
  compact,
  scandir,
  fileCompareSync,
  sleep,
  trump,
  range,
  defineProperty,
  loadEnv,
  sizeOf
}
