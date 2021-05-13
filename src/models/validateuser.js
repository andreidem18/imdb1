'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ValidateUser extends Model {
    static associate(models) {
      // define association here
    }
  };
  ValidateUser.init({
    hash: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ValidateUser',
    tableName: 'validate_user',
    underscored: true
  });
  return ValidateUser;
};