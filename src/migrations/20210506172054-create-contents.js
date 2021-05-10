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
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      total_seasons: {
        type: Sequelize.INTEGER
      },
      imdb_score: {
        type: Sequelize.DECIMAL
      },
      relase_date: {
        type: Sequelize.DATEONLY
      },
      play_time: {
        type: Sequelize.INTEGER
      },
      photo_link: {
        type: Sequelize.STRING
      },
      imdb_link: {
        type: Sequelize.STRING
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