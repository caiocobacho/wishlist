import { Router } from 'express';
import customerRouter from './customer.routes';
import sessionRouter from './session.routes';
import wishlistRouter from './wishlist.routes';

const routes = new Router();

routes.use(sessionRouter);
routes.use(customerRouter);
routes.use(wishlistRouter);

export default routes;
