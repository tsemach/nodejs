export type Callback = (err: any, ...args: any[]) => any;

export type EventEmitterCB = (length: number) => any

export type AsyncEventEmitterCB = (length: number) => Promise<any>