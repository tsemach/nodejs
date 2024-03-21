import { Logger } from '../../src/logger'
import { correlator, ClsService } from 'fms-cls'

const logger = Logger.setClsService(new ClsService()).get('wlogger-test')

function stamFN() {
  let a = 'a1'
  // logger.silly('stamFN: this is silly message, a:', a)
  logger.debug('stamFN: this is debug message, a:', a)
  logger.info('stamFN: this is info message, a:', a)
  logger.warn('warn second message, a:', a)
  logger.error('error !!! second message, a:', a)
  // logger.fatal('fatal **** second message, a:', a)
}

for (let i = 0; i < 100; i++) {
  stamFN()
  
  class AA {
    print() {
      let a = 'I am a arg'
      let b = 'I am b arg'
      let o = { name: 'tsemach', last: 'mizrachi'}
      logger.info('I called AA.print method, A IS:', a, ', this is b:', b, ', this is object:', JSON.stringify(o, undefined, 2))
      logger.error('THis is error, a:', a)
    }
  }
  
  // new AA().print()
  break;
}

function printCurrentId(name: string) {
  logger.f('username', 'tsemach')
  logger.o({ 'id': '1234', 'name': 'tsemach' })    
  logger.o({ 'user': { 'id': '1234', 'name': 'tsemach' }})    
  logger.info('printCurrentId: log with correlationId', name)
  logger.warn('this is warn message')
  logger.debug('this is debug message')
  logger.error('this is error message')
  logger.fatal('this is fatal message')
}

correlator.withId(() => {
  setTimeout(() => {
    printCurrentId("withId block 1, call 1");
  });
  setTimeout(() => {
    printCurrentId("withId block 1, call 2");
  }, 1000);
});
