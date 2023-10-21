import { shutdown, events } from '../events'
import { J } from '../../src/common'
import { Request } from '../../src/types'
import Logger from '../common/logger'
const logger = Logger.get('audit')

// @events('shutdown', 'onShutdownEvent')
@events([{ name: 'shutdown', method: 'onShutdownEvent' }, { name: 'health', method: 'onHealth' }])
// @shutdown('onShutdownEvent')
export class HealthService {      

  constructor() {    
  }
  
  async onShutdownEvent() {
    logger.info(`[onShutdownEvent]: got shutdown signal`);    

    return 'HealthService:onShutdownEvent'
  }
  
  async onHealth(controller: string, req: Request) {        
    logger.info(`[onHealth]: got health signal with args: ${controller}, ${J(req.path)}`);

    return 'HealthService:onHealth'
  }
    
}

export default new HealthService()