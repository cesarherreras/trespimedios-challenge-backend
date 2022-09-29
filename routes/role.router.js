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
    const roles = await service.find();
    res.json(roles);
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
    const role = await service.findById(id);
    res.json(role);
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
      const newRole = await service.create(body);
      res.status(201).json(newRole);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;