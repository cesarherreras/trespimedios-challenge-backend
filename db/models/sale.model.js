const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('./product.model');
const { USER_TABLE } = require('./user.model');

const SALE_TABLE = 'sales';

const SaleSchema = {
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  qty: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  saleAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'sale_at',
    defaultValue: Sequelize.NOW,
  }
};

class Sale extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'usersSale' });
    this.belongsTo(models.Product, { as: 'products' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SALE_TABLE,
      modelName: 'Sale',
      timestamps: false
    }
  }
}

module.exports = { SALE_TABLE, SaleSchema, Sale }