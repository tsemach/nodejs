import { expect } from 'chai'
import { Config, instance } from '../src/config'
import { ConfigES, ConfigESParamsType } from '../src/config-es'

describe('Test Config API', function() {   
  this.beforeAll(async () => {    
})  

  this.afterAll(() => {    
  })  

  it('config-es.test.ts: test es config host and port property', async () => {         
    // const config = ConfigES.new()
    const config = ConfigES.new()
        
    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    expect(config.host).to.be.equal('tsemach.org')
        
    config._params.host = 'domain.org'
    config._params.port = 8081
    console.log('config.params():', config.params())

    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    expect(config.host).to.be.equal('domain.org')
    expect(config.port).to.be.equal(8081)
  })  

  it('config-es.test.ts: test es config with instance factory method', async () => {         
    const config = instance<ConfigES, ConfigESParamsType>(ConfigES)
        
    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    expect(config.host).to.be.equal('tsemach.org')
        
    config._params.host = 'domain.org'
    config._params.port = 8081
    console.log('config.params():', config.params())

    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    expect(config.host).to.be.equal('domain.org')
    expect(config.port).to.be.equal(8081)
  })  
   
  it('config-es.test.ts: test es config after init', async () => {    
    const config = ConfigES.new()
        
    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    expect(config.host).to.be.equal('tsemach.org')
    expect(config.port).to.be.equal(8080)
        
    config.init({
      host: 'domain.org',
      port: 8081
    })

    console.log('config.params():', config.params())

    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    expect(config.host).to.be.equal('domain.org')
    expect(config.port).to.be.equal(8081)
  })  

}) 