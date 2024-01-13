import { Indicator } from '../../src/registry'
import { expect } from 'chai';

describe('Register API Test', () => {

  before(async () => {            
  })

  it('indicator.test.ts: test indicator create and get', async () => {
    console.log("test called")

    const indicator = new Indicator('group', 'worker')
    console.log('indicator.toString():', indicator.toString())
    
    expect(indicator.toString()).to.be.equal('group:worker')    
  });
  
});
