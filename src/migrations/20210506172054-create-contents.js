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
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_seasons: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      imdb_score: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      relase_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      play_time: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      photo_link: {
        type: Sequelize.STRING
      },
      imdb_link: {
        type: Sequelize.STRING,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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