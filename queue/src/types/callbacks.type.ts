export type Callback = (err: any, ...args: any[]) => any;

export type EventEmitterCB<T = any> = (value: T | T[]) => any

export type AsyncEventEmitterCB<T = any> = (value: T | T[]) => Promise<any>