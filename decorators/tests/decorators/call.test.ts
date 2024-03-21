import Logger from '../../src/common/logger'
import { Test } from '../../src/decorators/test.decorator'

const logger = Logger.get('application-test')
// type AsyncFN = async () => 
type AsyncFN = () => any

describe('Test Duration Decorator API', function() {  
  this.beforeAll(async () => {    
  })

  this.afterAll(() => {    
  })
  
  it('duration.test.ts: test duration is log ok', async () => {        
    // await somenf()
  })
    
}) 

class Stam {
  public _describe = 'API Test'

  // @Describe('API Test', )
  @Test('@TestID', 'this is test header', () => {
    console.log("TEST MERHOD this is the test body 1")
  })f1(){}

  // @Describe('API Test', )
  @Test('@TestID2', 'this more test header', () => {
    console.log("TEST MERHOD this is the test body 2")
  })f2(){}

 
  get describe() {
    return this._describe
  }
}

new Stam()
// async function main() {
//   const stam = new Stam()

//   // stam.f('duration.test.ts: test duration is log ok', async () => {        
//   //   console.log("this is the test body")
//   // })
// }

// main()