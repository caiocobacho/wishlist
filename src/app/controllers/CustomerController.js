import Customer from '../schemas/Customer';

import Wishlist from '../schemas/Wishlist';

// import Cache from '~/lib/Cache';
import Cache from '../../lib/Cache';

class CustomerController {
  async show(req, res) {
    const customer = await Customer.findById({ _id: req.userId });

    if (!customer)
      return res.status(404).json({
        message: 'Conta não encontrada, talvez tenha sido excluída.',
      });

    return res.json(customer);
  }

  async store(req, res) {
    const { name, email } = req.body;

    const emailExists = await Customer.findOne({
      email,
    });

    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já utilizado!' });
    }

    const { _id: id } = await Customer.create({
      name,
      email,
    });

    if (!id) {
      res.status(500).json({
        message:
          'Ocorreu um erro interno ao criar uma conta de cliente. Tente novamente.',
      });
    }

    await Wishlist.create({
      customer_id: id,
    });

    return res.status(200).json({ name, email });
  }

  async update(req, res) {
    const { name, email } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.userId,
      {
        name,
        email,
      },
      { new: true }
    );

    if (!customer) {
      res.status(500).json({
        message: 'Ocorreu um erro ao atualizar a conta do cliente!',
      });
    }

    return res.json({ message: 'Usuário atualizado com sucesso!' });
  }

  async delete(req, res) {
    const cached = await Cache.get(`customer:${req.userId}:wishlist:1`);

    if (cached) {
      await Cache.invalidatePrefix(`customer:${req.userId}:wishlist`);
    }

    await Wishlist.deleteOne({ customer_id: req.userId });

    await Customer.deleteOne({ _id: req.userId });

    return res.json({ message: 'Cliente excluído com sucesso!' });
  }
}

export default new CustomerController();
