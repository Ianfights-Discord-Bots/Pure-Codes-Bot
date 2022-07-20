import { Router } from 'express';
import { webhookRouter } from './routes/webhooks';


const routes = Router();

routes.use('/webhooks', webhookRouter);

export { routes as routes }