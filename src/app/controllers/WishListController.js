import axios from 'axios';

import Wishlist from '../schemas/Wishlist';

import Cache from '../../lib/Cache';
import productAPI from '../../config/api';
import wishlistConfig from '../../config/wishlist';

class WishlistController {
  async index(req, res) {
    const page = parseInt(req.query.page, 22) || 1;

    const cacheKey = `customer:${req.userId}:wishlist:${page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const wishlist = await Wishlist.findOne({ customer_id: req.userId });

    if (!wishlist)
      return res.status(404).json({
        message: 'Ainda não existe uma lista de desejos para esta conta.',
      });

    const pagedWishlist = wishlist.list.slice(
      (page - 1) * wishlistConfig.page_limit,
      page * wishlistConfig.page_limit
    );

    const list = [];

    for (let i = 0; i < pagedWishlist.length; i += 1) {
      const product = await axios.get(`${productAPI.url + wishlist.list[i]}`);

      product.data.url = productAPI.url + wishlist.list[i];

      list.push(product.data);
    }

    await Cache.set(cacheKey, list);

    return res.json(list);
  }

  async update(req, res) {
    const { product_id } = req.params;

    const { option } = req.query;

    const wishlist = await Wishlist.findOne({ customer_id: req.userId });

    if (!wishlist)
      return res.status(404).json({
        message:
          'Lista de desejos não encontrada, crie sua lista de desejos primeiro.',
      });

    switch (option) {
      case 'add': {
        const productInList = await wishlist.list.find(
          product => product === product_id
        );

        if (productInList)
          return res.status(400).json({
            message: 'Você já tem este produto em sua lista de desejos!',
          });

        try {
          await axios.get(productAPI.url + product_id);
        } catch (error) {
          return res.status(404).json({
            message: 'O produto não existe ou foi removido da loja.',
            error: error.message,
          });
        }

        wishlist.list.push(product_id);

        await wishlist.save();

        break;
      }
      case 'remove': {
        wishlist.list.pull(product_id);

        await wishlist.save();
        break;
      }
      default: {
        return res.status(400).json({ message: 'A opção não é válida.' });
      }
    }

    const cached = await Cache.get(`customer:${req.userId}:wishlist:1`);

    if (cached) {
      await Cache.invalidatePrefix(`customer:${req.userId}:wishlist`);
    }

    return res.json(wishlist.list);
  }

  async delete(req, res) {
    const cached = await Cache.get(`customer:${req.userId}:wishlist:1`);

    if (cached) {
      await Cache.invalidatePrefix(`customer:${req.userId}:wishlist`);
    }

    await Wishlist.findOneAndUpdate({ customer_id: req.userId }, { list: [] });

    return res.json({ message: 'Wishlist deleted succesfully.' });
  }
}

export default new WishlistController();
