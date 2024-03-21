import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Type } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Application } from '../../src/application';

export class Initiator {
  public static _instance: Initiator;
  private _isInit = false;
  private _app: INestApplication;

  private constructor() {}

  public static get instance() {
    return Initiator._instance || (Initiator._instance = new Initiator());
  }

  async init() {
    if (!this._isInit) {
      this._isInit = true;
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this._app = moduleFixture.createNestApplication();
    await this._app.init();
    Application.instance.app = this._app;
  }

  get<T = any>(
    module: any,
    service: string | symbol | Type<T>,
    options = { strict: true },
  ) {
    return this._app.select(module).get(service, options) as T;
  }

  get app() {
    return this._app;
  }
}
