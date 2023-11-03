import { Server } from '../application';
import morgan from 'morgan'

morgan.token('client_ip', function getId(req: any) {
  return req.headers && req.headers['x-forwarded-for'] || '-';
});

function removeLivenessAndHealth(req: any, res: any) {
  return req.url.includes("/liveness") || req.url.includes("/readines") || req.url.includes("/") 
}
  
Server.instance.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :client_ip', {
  skip: removeLivenessAndHealth
}))

