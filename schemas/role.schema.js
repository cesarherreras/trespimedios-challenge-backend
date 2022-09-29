const Joi = require('joi');

const name = Joi.string();

const createRoleSchema = Joi.object({
  name: name.required()
});

const updateRoleSchema = Joi.object({
  name
});

module.exports = { createRoleSchema, updateRoleSchema }