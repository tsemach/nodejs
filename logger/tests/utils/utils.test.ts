import { globSync } from 'glob'
import * as utils from '../../src/utils'
import appRoot from 'app-root-path';

const { NODE_ENV, MODULE_NAME } = process.env

describe('Utils API Test', () => {  
  const loggerFile = (NODE_ENV === 'local' ? `logger-${MODULE_NAME}-*` : `/shared/tmp/fms-logger-${MODULE_NAME}-*`)

  before(async () => {        
  })

  it('utils.test.ts: test delete file using glob', async () => {
    console.log('appRoot:', appRoot.path)
    console.log('__dirname:', __dirname)
    console.log('loggerFile:', loggerFile)
    const files = globSync(`${appRoot.path}/${loggerFile}`);

    console.log("glob file:", files)

    try {
      utils.deleteLogsFiles()
    }
    catch (e) {
      console.log(e)
    }
  });

});

