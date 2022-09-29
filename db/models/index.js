const { User, UserSchema } = require('./user.model');
const { Sale, SaleSchema } = require('./sale.model');
const { Product, ProductSchema } = require('./product.model');
const { Role, RoleSchema } = require('./role.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Sale.init(SaleSchema, Sale.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  User.associate(sequelize.models);
  Sale.associate(sequelize.models);
  Role.associate(sequelize.models);
}

module.exports = setupModels;