/**
 * from: https://medium.com/@jose-luis-navarro/logging-on-nestjs-like-a-pro-with-correlation-ids-log-aggregation-winston-morgan-and-more-d03e3bb56772 
*/

export interface ClsService {
  setContextId?(contextId: string): void;
  getContextId?(): string;
  setId?(contextId: string): void;
  getId(): string
  get?<T>(key: string): T;
  set?<T>(key: string, value: T): void;  
}
