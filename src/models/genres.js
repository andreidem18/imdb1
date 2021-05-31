'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genres extends Model {
    static associate(models) {
      this.belongsToMany(models.Contents, {
        through: 'content_genres',
        foreignKey: 'genre_id'
      });
    }
  };
  Genres.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Genres',
    tableName: 'genres',
    underscored: true
  });
  return Genres;
};