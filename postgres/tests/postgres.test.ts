import { Postgres } from '../src/postgres'
import { expect } from 'chai';

describe('Postgres API Test', () => {
  before(async () => {            
  })

  it('postgres.test.ts: test connect is connected', async () => {
    console.log("test called")
    
    const query = 'SELECT 1+1 AS result'
    const db = new Postgres().connect()
        
    await db.sequelize.authenticate();
    console.log("connection has been established successfully.");

    const reply = await db.sequelize.query(query)
    console.log('reply:', reply)
    // expect(reply.body.status).to.be.equal('OK')
  });
});
