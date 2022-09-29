const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class SaleService {
  constructor() {}

  async create(data) {
    const newSale = await models.Sale.create(data);
    return newSale;
  }

  async find() {
    const rta = await models.Sale.findAll({
        attributes: [`id`, `productId`, `userId`, `qty`, `saleAt`]
    });
    return rta;
  }

  async findOne(id) {
    const sale = await models.Sale.findByPk(id, {
        include: ['products'],
        attributes: [`id`, `productId`, `userId`, `qty`, `saleAt`]
    });
    if (!sale) {
      throw boom.notFound('sale not found');
    }
    return sale;
  }

  async delete(id) {
    const sale = await this.findOne(id);
    await sale.destroy();
    return `Sale ${id} was deleted`;
  }

  async update(id, changes) {
    const sale = await this.findOne(id);
    const rta = await sale.update(changes);
    return rta;
  }
}

module.exports = SaleService;