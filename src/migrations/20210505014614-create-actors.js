'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('actors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
          notEmpty: true,
          notNull: true
        }
      },
      lastname: {
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
          notEmpty: true,
          notNull: true
        }
      },
      dob: {
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
          notEmpty: true,
          notNull: true
        }
      },
      biography: {
        type: Sequelize.TEXT,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      profile_photo: {
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
    await queryInterface.dropTable('actors');
  }
};