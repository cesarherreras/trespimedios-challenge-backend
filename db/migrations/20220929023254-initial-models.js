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
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
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
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
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
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
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
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        references: {
          model: ROLE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.createTable(SALE_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
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
        type: Sequelize.DataTypes.UUID,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
