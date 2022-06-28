const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      price: DataTypes.STRING,
      description: DataTypes.STRING
    }, {
      sequelize
    })
  }
}

module.exports = Product;