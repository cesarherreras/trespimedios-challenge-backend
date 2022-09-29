const express = require('express');

const SaleService = require('./../services/sale.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSaleSchema, updateSaleSchema, getSaleSchema } = require('./../schemas/sale.schema');

const router = express.Router();
const service = new SaleService();

//Get the list of sales
router.get('/',
  async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Get specific sale
router.get('/:id',
  validatorHandler(getSaleSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await service.findOne(id);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Create a sale
router.post('/',
  validatorHandler(createSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//Delete sale
router.delete('/:id',
  checkRoles('admin'),
  validatorHandler(getSaleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const newUser = await service.delete(id);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

// Update sale
router.patch('/:id',
  checkRoles('admin'),
  validatorHandler(getSaleSchema, 'params'),
  validatorHandler(updateSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const rta = await service.update(id, body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;