const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const description = Joi.string();
const price = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required()
});

const updateProductSchema = Joi.object({
  name,
  description,
  price
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }