'use strict';

const { PRODUCT_TABLE } = require('./../models/product.model');
const { ROLE_TABLE } = require('./../models/role.model');
const { SALE_TABLE } = require('./../models/sale.model');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'id', {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn(USER_TABLE, 'role_id', {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn(ROLE_TABLE, 'id', {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn(SALE_TABLE, 'id', {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn(USER_TABLE, 'id', {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn(SALE_TABLE, 'product_id', {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn(SALE_TABLE, 'user_id', {
      type: Sequelize.UUID,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'id', {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn(ROLE_TABLE, 'id', {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn(SALE_TABLE, 'id', {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn(SALE_TABLE, 'product_id', {
      type: Sequelize.INTEGER
    });
    await queryInterface.changeColumn(SALE_TABLE, 'user_id', {
      type: Sequelize.INTEGER
    });
    await queryInterface.changeColumn(USER_TABLE, 'id', {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn(USER_TABLE, 'role_id', {
      type: Sequelize.INTEGER
    });
  }
};
