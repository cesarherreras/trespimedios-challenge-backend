const express = require('express');

const usersRouter = require('./user.router');
// const authRouter = require('./auth.router');
const SalesRouter = require('./sale.router');
const RolesRouter = require('./role.router');
// const ProductsRouter = require('./product.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
//   router.use('/auth', authRouter);
  router.use('/roles', RolesRouter);
  router.use('/sales', SalesRouter);
//   router.use('/products', ProductsRouter);

}

module.exports = routerApi;