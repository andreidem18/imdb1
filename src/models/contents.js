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
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    total_seasons: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        notEmpty: true,
      }
    },
    imdb_score: {
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true
      }
    },
    relase_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        notEmpty: true,
      }
    },
    play_time: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        notEmpty: true,
      }
    },
    photo_link: DataTypes.STRING,
    imdb_link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notEmpty: true,
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Contents',
    tableName: 'contents',
    underscored: true
  });
  return Contents;
};