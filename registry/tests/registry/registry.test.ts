import { Worker } from '../../src/worker/worker'
import { Provider } from '../../src/worker/provider'
import { Indicator, Registry } from '../../src/registry'
import { expect } from 'chai';

describe('Register API Test', () => {

  before(async () => {            
  })

  it('registry.test.ts: test registry by add method', async () => {
    console.log("test called")
    const indicator = new Indicator('group', 'worker')

    Registry.instance.add(indicator, Worker)
    let worker = Registry.instance.get<Worker>(indicator)    
    worker.print()
    worker.inc()
    worker.inc()
    worker.print()

    worker = Registry.instance.get<Worker>(indicator)    
    worker.print()

    expect(worker).to.be.an.instanceof(Worker)
    expect(worker.name()).to.be.equal('Worker')
    expect(worker.count).to.be.equal(2)
    expect(Registry.instance.has(indicator)).to.be.true
  });
  
  it('registry.test.ts: test registry by regitry decorator', async () => {
    console.log("test called")
    const indicator = new Indicator('group', 'provider')
    
    let provider = Registry.instance.get<Provider>(indicator)    
    provider.print()
    provider.inc()
    provider.inc()
    provider.print()
    
    provider = Registry.instance.get<Provider>(indicator)    
    provider.print()

    expect(provider).to.be.an.instanceof(Provider)
    expect(provider.name()).to.be.equal('Provider')
    expect(provider.count).to.be.equal(2)
    expect(Registry.instance.has(indicator)).to.be.true
  });

  it('registry.test.ts: test registry request options', async () => {
    console.log("test called")
    const indicator = new Indicator('group', 'provider')
    
    const provider = Registry.instance.get<Provider>(indicator)    
    provider.print()

    expect(provider).to.be.an.instanceof(Provider)
    expect(provider.name()).to.be.equal('Provider')
    expect(Registry.instance.has(indicator)).to.be.true
  });

});
