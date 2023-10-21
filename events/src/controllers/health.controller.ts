import express from 'express';
import { Server } from '../application';
import { Controller, Request, Response } from '../types';
import Logger from '../common/logger';
import { EventPool } from '../events';
const logger = Logger.get('uplaod-route')

class HealthController implements Controller {

  constructor() {    
    Server.instance.route('/', this);
  }

  public add(): express.Router {
    let router = express.Router();
                    
    router.get(['/health', '/liveness', '/readines'], async (req: Request, res: Response) => {      
      res.json({ status: 'ok', controller: 'HealthController', path: req.path})

      // EventPool.instance.fire('health', { controller: "HealthController", req })
      EventPool.instance.fire('health', "HealthController", req)

      res.send(200)
    })
    
    return router;
  }

}

export default new HealthController();


