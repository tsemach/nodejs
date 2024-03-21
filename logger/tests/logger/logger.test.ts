import Logger from '../../src'
import { correlator } from 'fms-cls';
import { expect } from 'chai'

describe('Logger API Test', () => {  

  before(async () => {        
  })

  it('logger.test.ts: test add single fields api', async () => {
    const logger = Logger.get('field-test')

    logger.f('userId', '1234')

    const fields = logger.getFields()
    console.log("fields are:", fields)

    expect(fields['userId']).to.be.equal('1234')
  });

  it('logger.test.ts: test add multiple fields api', async () => {
    const logger = Logger.get('field-test')

    logger.f('id', '1234')
    logger.f('name', 'tsemach')    
    logger.f('user', { name: 'mizrachi' })

    const fields = logger.getFields()
    console.log("fields are:", fields)

    expect(fields['id']).to.be.equal('1234')
    expect(fields['name']).to.be.equal('tsemach')
    expect(fields['user']).deep.equal({ name: 'mizrachi' })
  });

  it('logger.test.ts: test add object api', async () => {
    const logger = Logger.get('field-test')

    logger.o({ id: '1234', name: 'tsemach' })    

    const name = logger.getField('name')
    console.log("name are:", name)

    const id = logger.getField('id')
    console.log("id are:", id)

    logger.o({ 'user': { id: '1234', name: 'tsemach' }})    
    const user = logger.getField('user')
    console.log("user are:", user)

    expect(id).to.be.equal('1234')
    expect(name).to.be.equal('tsemach')
    expect(user).deep.equal({ id: '1234', name: 'tsemach' })
  });

  it('logger.test.ts: test get single field api with correlator', async () => {
    const logger = Logger.get('field-test')

    correlator.setId('ffff')

    logger.f('id', '1234')
    logger.f('name', 'tsemach')    
    logger.f('user', { name: 'mizrachi' })

    const name = logger.getField('name')
    console.log("name are:", name)

    expect(name).to.be.equal('tsemach')
  });
  
  it('logger.test.ts: test set default options', async () => {
    Logger.setDefaultOptions({ withUDSTransport: true })
    const logger = Logger.get('field-test')

    console.log('logger options:', logger.options)
    // expect(fields['userId']).to.be.equal('1234')
  });  
});

