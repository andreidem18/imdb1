'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    static associate(models) {
      this.belongsToMany(models.Directors, {
        through: 'content_directors',
        foreignKey: 'content_id'
      });
      this.belongsToMany(models.Genres, {
        through: 'content_genres',
        foreignKey: 'content_id'
      });
      this.belongsToMany(models.Actors, {
        through: 'content_actors',
        foreignKey: 'content_id'
      });
    }
  };
  Contents.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    total_seasons: DataTypes.INTEGER,
    imdb_score: DataTypes.DECIMAL,
    relase_date: DataTypes.DATEONLY,
    play_time: DataTypes.INTEGER,
    imdb_link: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Contents',
    tableName: 'contents',
    underscored: true
  });
  return Contents;
};