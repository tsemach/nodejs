import Logger from '../../src/common/logger'
import request from 'supertest'
import { J } from '../../src/common' 
import { Server } from '../../src/application'
import { Initiator } from '../common/initiator'
import { EventPool } from '../../src/events'
import { expect } from 'chai'
import { utils } from '../../src/common'
import { duration } from '../../src/decorators'
import { shutdown } from 'log4js'
import { somenf } from './somefn'
const logger = Logger.get('application-test')

describe('Test Duration Decorator API', function() {  
  this.beforeAll(async () => {    
  })

  this.afterAll(() => {    
  })

  it('duration.test.ts: test duration is log ok', async () => {        
    await somenf()
  })
    
}) 