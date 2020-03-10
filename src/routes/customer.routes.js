import { Router } from 'express';
import CustomerController from '../app/controllers/CustomerController';
import validateCustomerStore from '../app/validators/CustomerStore';
import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

routes.post('/customer', validateCustomerStore, CustomerController.store);

routes.use(authMiddleware);
routes.get('/customer', CustomerController.show);
routes.put('/customer', CustomerController.update);
routes.delete('/customer', CustomerController.delete);

export default routes;
