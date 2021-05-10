'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContentDirectors extends Model {
    static associate(models) {
      this.belongsTo(models.Contents, {foreignKey: 'content_id'})
      this.belongsTo(models.Directors, {foreignKey: 'director_id'})
    }
  };
  ContentDirectors.init({
    director_id: DataTypes.INTEGER,
    content_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'content_directors',
    underscored: true,
    modelName: 'ContentDirectors',
  });
  return ContentDirectors;
};