import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Initiator } from './common';

describe('AppController (e2e)', () => {  

  before(async () => {    
    await Initiator.instance.init()    
  })

  it('/ (GET)', () => {
    return request(Initiator.instance.app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
