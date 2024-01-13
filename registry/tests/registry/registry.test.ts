import { Worker } from '../../src/worker/worker'
import { Indicator, Registry } from '../../src/registry'
import { expect } from 'chai';

describe('REgister API Test', () => {

  before(async () => {            
  })

  it('registry.test.ts: test registry add and get method', async () => {
    console.log("test called")
    const indicator = new Indicator('group', 'worker')

    Registry.instance.add(indicator, Worker)
    const worker = Registry.instance.get<Worker>(indicator)    
    worker.print()

    expect(worker).to.be.an.instanceof(Worker)
    expect(worker.name()).to.be.equal('Worker')
    expect(Registry.instance.has(indicator)).to.be.true
  });
  
});
