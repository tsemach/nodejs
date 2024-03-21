import Logger, { LoggerOptions } from '../../src'
import { correlator } from 'fms-cls'

// Logger.setDefaultOptions({ withConsole: true, withFileTranspot: false, withUDSTransport: true })
const logger = Logger.setDefaultOptions({ withConsole: true, withFileTranspot: false, withUDSTransport: true }).get('wlogger-test')

function printCurrentId(name: string) {
  logger.f('username', 'tsemach')
  logger.o({ 'id': '1234', 'name': 'tsemach' })    
  logger.o({ 'user': { 'id': '1234', 'name': 'tsemach' }})    
  logger.info('printCurrentId: log with correlationId', name)
}

correlator.withId(() => {
  setTimeout(() => {
    printCurrentId("withId block 1, call 1");
  });
  setTimeout(() => {
    printCurrentId("withId block 1, call 2");
  }, 1000);
});
