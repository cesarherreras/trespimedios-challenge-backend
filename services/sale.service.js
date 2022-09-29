const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class SaleService {
  constructor() {}

  async create(data) {
    const newSale = await models.Sale.create(data);
    return newSale;
  }

  async find() {
    const rta = await models.Sale.findAll({
      include: ['products']
    });
    const rtaTotal = rta.map((element) => {
      const obj = {
        ...element.dataValues,
        total: element.dataValues.qty * element.dataValues.products.dataValues.price
      };
      return obj;
    })
    return rtaTotal;
  }

  async findOne(id) {
    const sale = await models.Sale.findByPk(id, {
      include: ['products']
    });
    if (!sale) {
      throw boom.notFound('sale not found');
    }
    const obj = {
      ...sale.dataValues,
      total: sale.dataValues.qty * sale.dataValues.products.dataValues.price
    };
    return obj;
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

  async getDaily(day) {
    const rta = await models.Sale.findAll({
      where: {
          saleAt: {
            [Op.between]: [`${day} 00:00:00`, `${day} 23:59:59`]
          }
      },
      include: ['products']
    });
    const rtaTotal = rta.map((element) => {
      const obj = {
        ...element.dataValues,
        total: element.dataValues.qty * element.dataValues.products.dataValues.price
      };
      return obj;
    })
    const rtaTotalDaily = rtaTotal.reduce((total, element) => {
      return total += element.total;
    }, 0);
    const objRta = {
      ...rtaTotal,
      totalDaily: rtaTotalDaily
    }
    return objRta;
  }

  async getMonthly(month, year) {
    const days = new Date(year, month, 0).getDate();
    const rta = await models.Sale.findAll({
      where: {
          saleAt: {
            [Op.between]: [`${year}-${month}-1 00:00:00`, `${year}-${month}-${days} 23:59:59`]
          }
      },
      include: ['products']
    });
    const rtaTotal = rta.map((element) => {
      const obj = {
        ...element.dataValues,
        total: element.dataValues.qty * element.dataValues.products.dataValues.price
      };
      return obj;
    })
    const rtaTotalDaily = rtaTotal.reduce((total, element) => {
      return total += element.total;
    }, 0);
    const objRta = {
      ...rtaTotal,
      totalDaily: rtaTotalDaily
    }
    return objRta;
  }
}

module.exports = SaleService;