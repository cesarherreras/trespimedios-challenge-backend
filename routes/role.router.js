const express = require('express');

const RoleService = require('./../services/role.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { createRoleSchema } = require('./../schemas/role.schema');

const router = express.Router();
const service = new RoleService();

//Get the list of roles
router.get('/',
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Get specific role
router.get('/:id',
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await service.findById(id);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Create a role
router.post('/',
  checkRoles('admin'),
  validatorHandler(createRoleSchema, 'body'),
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

module.exports = router;