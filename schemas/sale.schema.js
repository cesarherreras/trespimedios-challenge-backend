const Joi = require('joi');

const id = Joi.string().uuid();
const productId = Joi.string().uuid();
const qty = Joi.number().integer();
const userId = Joi.string().uuid();
const saleAt = Joi.date();

const createSaleSchema = Joi.object({
  productId: productId.required(),
  qty: qty.required(),
  userId: userId.required()
});

const updateSaleSchema = Joi.object({
  productId,
  userId,
  qty,
  saleAt
});

const getSaleSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSaleSchema, updateSaleSchema, getSaleSchema }