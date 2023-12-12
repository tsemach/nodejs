import { INestApplication, DynamicModule, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

export class Application {
  private static _instance: Application;
  private _app: INestApplication<any>
  private _isInit = false

  private constructor() {     
  }

  public static get instance(): Application {
    return Application._instance || (Application._instance = new Application());    
  }
     
  async create<T>(modules: T) {
    this._app = await NestFactory.create(modules);   
    return this._app
  }

  get<T = any>(module: any, searvice: string | symbol | Function | Type<T>, options = { strict: true })  {
    return this._app.select(module).get(searvice, options) as T
  }  

  async listen(port = 3000) {
    await this.app.listen(port);    
  }

  async init() {
    if (this._isInit) {
      return 
    }
   
    this._isInit = true
  }

  get app() {
    return this._app
  }

  set app(_app: INestApplication<any>) {
    this._app = _app
  }

  get initStatus() {
    return this._isInit
  }

}
