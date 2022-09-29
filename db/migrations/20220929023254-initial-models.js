'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { SALE_TABLE } = require('./../models/sale.model');
const { PRODUCT_TABLE } = require('./../models/product.model');
const { ROLE_TABLE } = require('./../models/role.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      }
    });
    await queryInterface.createTable(ROLE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      }
    });
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      document: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      roleId: {
        field: 'role_id',
        type: Sequelize.INTEGER
      }
    });
    await queryInterface.createTable(SALE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        field: 'product_id',
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER
      },
      qty: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      saleAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'sale_at',
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(SALE_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
  }
};
