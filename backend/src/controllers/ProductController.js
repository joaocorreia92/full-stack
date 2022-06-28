const Product = require('../models/Product');

module.exports = {
  async store(req, res) {
    const { name, brand, price, description } = req.body;

    const product = await Product.create({
      name,
      brand,
      price,
      description
    });

    return res.json(product);
  }
}