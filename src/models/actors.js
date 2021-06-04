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
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    biography: DataTypes.TEXT,
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