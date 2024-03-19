import { AsyncQueue } from "../src/aysnc-queue"
import { AsyncEventEmitterCB, EventEmitterCB } from "../src/types"
import { utils } from "../src/utils"
import { expect } from 'chai'

describe('Async Queue API Test', () => {
  type ItemType = { headers?: { [hame: string ]: string | number }, data: string }

  it('async-queue.test.ts: test on api - notify on put', async () => {  
    const queue = new AsyncQueue<ItemType>(10)

    await queue.put({ data: 'simple-test' })
    const item = await queue.get()
    const size = queue.size

    console.log("[async-queue.test.ts] simple-test, item:", item)
    console.log("[async-queue.test.ts] simple-test, size:", size)

    expect(item).deep.equal({ data: 'simple-test' })
    expect(size).to.be.equal(0)
  })

  it('async-queue.test.ts: test get with 3 needed', async () => {
    const queue = new AsyncQueue<ItemType>(10)    
    
    console.log("[async-queue.test.ts] get await test, test start at:", new Date().valueOf())
    
    const putin = async () => {
      return new Promise(async (resolve, _) => {      
        let epoch: number

        for await (const i of utils.range(0, 3)) {
          epoch = new Date().valueOf()

          console.log("[async-queue.test.ts] get await test, before put date:", epoch)        
          queue.put({ data: `get-await-test-${i}, ${epoch}` })

          await utils.sleep(1000)
        }        

        resolve(epoch)
      })
    }

    const getin = async () => {
      return new Promise(async (resolve, _) => {
        await queue.get(3)

        const epoch = new Date().valueOf()
        console.log("[async-queue.test.ts] get await test, after get, date:", epoch)

        resolve(epoch)
      })
    }

    const result = await Promise.all([
      putin(),
      getin()
    ])    
    const size = queue.size  
            
    console.log("[async-queue.test.ts] get await test, result:", result)
    console.log("[async-queue.test.ts] get await test, size:", size)

    expect(result[0] <= result[1]).to.be.true
    expect(size).to.be.equal(0)
  })

  it('async-queue.test.ts: test callback with on method', (done) => {  
    const queue = new AsyncQueue<string>(10)

    const eventCB: EventEmitterCB = async (length: number) => {
      console.log("eventCB, value is:", length)
      
      const data = await queue.get(length)
      console.log("eventCB, data is:", data)

      expect(data).to.equal('event-put')

      done()
    }
    queue.on(eventCB)
    queue.put('event-put').then(value => console.log("put: event-put"))
  })

  it('async-queue.test.ts: test callback with async callback', (done) => {  
    const queue = new AsyncQueue<string>(10)
    let calles = 0

    const asyncCB: AsyncEventEmitterCB = async (length: number) => {
      console.log("eventCB, value is:", length)
      
      const data = await queue.get(length)
      console.log("eventCB, data is:", data)

      expect(data).to.equal('event-put')

      if (++calles >= 2 ) {
        done()
      }
    }
    queue.on(asyncCB)

    queue.put('event-put-1').then(value => console.log("put: event-put-1"))
    queue.put('event-put-2').then(value => console.log("put: event-put-2"))
  })

})