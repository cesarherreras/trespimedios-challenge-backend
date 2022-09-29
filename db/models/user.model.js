const { Model, DataTypes, Sequelize } = require('sequelize');
const { ROLE_TABLE } = require('./role.model');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID
  },
  document: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: ROLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { as: 'roles' });
    this.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }