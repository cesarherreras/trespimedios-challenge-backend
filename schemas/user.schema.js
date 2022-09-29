const Joi = require('joi');

const id = Joi.string().uuid();
const document = Joi.string();
const name = Joi.string();
const lastName = Joi.string();
const roleId = Joi.string().uuid();

const createUserSchema = Joi.object({
  document: document.required(),
  name: name.required(),
  lastName: lastName.required(),
  roleId: roleId.required()
});

const updateUserSchema = Joi.object({
  document,
  name,
  lastName,
  roleId
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }