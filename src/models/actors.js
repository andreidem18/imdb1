'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actors extends Model {
    static associate(models) {
      this.belongsToMany(models.Contents, {
        through: 'content_actors', 
        foreignKey: 'actor_id'
      })
    }
  };
  Actors.init({
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
    dob: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        notEmpty: true,
      }
    },
    biography: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }
    },
    profile_photo: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    tableName: 'actors',
    modelName: 'Actors',
  });
  return Actors;
};