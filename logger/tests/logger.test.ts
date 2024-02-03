import { Logger, LoggerOptions } from '../src'
const logger = Logger.get('logger-test', { withUDSTransport: false })

logger.info('first test')

function stamFN() {
  let a = 'a1'
  logger.info('stamFN: this is info message, a:', a)
  logger.error('second message, a:', a)
}

stamFN()

logger.setOptions({ getCorrelationId: () => '111-222-444' })

class AA {
  print() {
    let a = 'I am a arg'
    let b = 'I am b arg'
    let o = { name: 'tsemach', last: 'mizrachi'}
    logger.info('I called AA.print method, A IS:', a, ', this is b:', b, ', this is object:', JSON.stringify(o, undefined, 2))
    logger.error('THis is error, a:', a)
  }
}

new AA().print()
