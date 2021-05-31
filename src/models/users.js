'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      
    }
  };
  Users.init({
    
    firstname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notEmpty: true,
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    underscored: true
  });

  return Users;
};