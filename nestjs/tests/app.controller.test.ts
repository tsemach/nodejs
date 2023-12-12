import { AppController } from '../src/controllers/app.controller';
import { Initiator } from './common'
import { expect } from 'chai'

describe('AppController', () => {
  let appController: AppController;

  before(async () => {    
    await Initiator.instance.init()    
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).to.be('Hello World!');
    });
  });
});
