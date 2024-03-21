import request from 'supertest';
import { Initiator } from './common';

describe('AppController (e2e)', () => {
  before(async () => {
    await Initiator.instance.init();
  });

  it('/ (GET)', () => {
    return request(Initiator.instance.app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
