const boom = require('@hapi/boom');
const RoleService = require('./../services/role.service');
const service = new RoleService();

function checkRoles(...roles) {
  return async (req, res, next) => {
    const roleId = req.headers['auth'];
    if(!roleId) {
        next(boom.forbidden('Insert Auth header'));
    }
    const authentication = await service.findById(roleId);
    if (roles.includes(authentication.dataValues.name)) {
      next();
    }else {
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkRoles };