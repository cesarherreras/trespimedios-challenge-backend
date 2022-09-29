const express = require('express');

const SaleService = require('./../services/sale.service');
const { checkRoles } = require('./../middlewares/auth.handler');

const router = express.Router();
const service = new SaleService();

//Get the daily amount of sales
router.get('/daily',
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const { day } = req.query;
    const dailySales = await service.getDaily(day);
    res.json(dailySales);
  } catch (error) {
    next(error);
  }
});

//Get the monthly amount of sales
router.get('/monthly',
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const monthlySales = await service.getMonthly(month, year);
    res.json(monthlySales);
  } catch (error) {
    next(error);
  }
});

module.exports = router;