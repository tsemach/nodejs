import Logger from '../../src/common/logger'
import request from 'supertest'
import { J } from '../../src/common' 
import { Server } from '../../src/application'
import { Initiator } from '../common/initiator'
import { EventPool } from '../../src/events'
import { expect } from 'chai'
import { utils } from '../../src/common'
const logger = Logger.get('application-test')

describe('Test Application API', function() {  
  this.beforeAll(async () => {
    await Initiator.instance.init({ withExit: false })
  })

  this.afterAll(() => {
    Initiator.instance.setOptions({ withExit: true })
  })

  it('application.test.ts: test send user1 event to activate shutdown', async () => {        
    process.kill(process.pid, "SIGUSR1");
    
    await utils.sleep(1000)    
    logger.info('test completed, EventPool.instance.fired:', EventPool.instance.fired)

    expect(EventPool.instance.fired.length).to.be.gt(0)
  })

  it('application.test.ts: test send health api to test firing health event', async () => {        

    const reply = await request(Server.instance.app)
      .get('/health')
      .send()    
    
    // await utils.sleep(1000)    
    logger.info('health api test completed, reply:', J(reply.body))
    logger.info('health api test completed, EventPool.instance.fired:', EventPool.instance.fired)

    expect(EventPool.instance.fired.length).to.be.gt(0)
    expect(EventPool.instance.fired[0][0]).to.be.equal('HealthService:onHealth')
  })
    
}) 