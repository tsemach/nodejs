import { Config } from '../src/config'
import { expect } from 'chai'

describe('Test Config API', function() {   
  this.beforeAll(async () => {    
  })  

  this.afterAll(() => {    
  })  

  it('config.test.ts: test config host property', async () => {     
    const config: any = new Config()
    
    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    config._params.host = 'domain.org'
    config._params.port = 80801

    console.log('config.host:', config.host)
    console.log('config.port:', config.port)

    // expect(config.host).to.be.equal('tsemach.org')
  })  
    
}) 