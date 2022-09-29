'use strict';

const { models } = require('../../libs/sequelize');
const products = require('../../constants/product');

module.exports = {
  async up () {
    await Promise.all(products.map(async data => {
      try {
        await models.Product.findOrCreate({
          where: data,
          defaults: data
        });
      } catch (error) {
        console.log(error);
      }
    }));
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Person', null, {});
  }
};
