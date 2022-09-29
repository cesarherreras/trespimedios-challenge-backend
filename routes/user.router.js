const express = require('express');

const UserService = require('./../services/user.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

//Get the list of users
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

//Get specific user
router.get('/:id',
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)
    const users = await service.findOne(id);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Create an user
router.post('/',
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
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

//Delete user
router.delete('/:id',
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
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

// Update user
router.patch('/:id',
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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