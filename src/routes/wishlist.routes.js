import { Router } from 'express';
import WishlistController from '../app/controllers/WishListController';

const routes = new Router();

routes.get('/wishlist', WishlistController.index);
routes.put('/wishlist/:product_id', WishlistController.update);
routes.delete('/wishlist', WishlistController.delete);

export default routes;
