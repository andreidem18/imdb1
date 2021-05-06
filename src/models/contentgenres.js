'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContentGenres extends Model {
    static associate(models) {
      this.belongsTo(models.Contents, {foreignKey: 'content_id'});
      this.belongsTo(models.Genres, {foreignKey: 'genre_id'});
    }
  };
  ContentGenres.init({
    genre_id: DataTypes.INTEGER,
    content_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ContentGenres',
  });
  return ContentGenres;
};