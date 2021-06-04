'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      description: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      total_seasons: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true
        }
      },
      imdb_score: {
        type: Sequelize.DECIMAL,
        validate: {
          isNumeric: true
        }
      },
      relase_date: {
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
          notEmpty: true,
          notNull: true
        }
      },
      play_time: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true
        }
      },
      photo_link: {
        type: Sequelize.STRING
      },
      imdb_link: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true
        }
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contents');
  }
};