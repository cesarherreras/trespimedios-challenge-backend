const { models } = require('./../libs/sequelize');

class RoleService {
  constructor() {}

  async create(data) {
    const newRole = await models.Role.create(data);
    return newRole;
  }

  async find() {
    const rta = await models.Role.findAll();
    return rta;
  }

  async findById(id) {
    const rta = await models.Role.findOne({
      where: { id }
    });
    return rta;
  }
}

module.exports = RoleService;