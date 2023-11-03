import { Callback } from "../types";

function safeCallBack(cb: Callback, err: any, ...args: any[]) {
  if (!!cb) {
    cb(err, ...args)
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export {
  safeCallBack,
  sleep
}