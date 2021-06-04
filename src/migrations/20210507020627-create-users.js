'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
          notNull: true
        }
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      reset_token: {
        type: Sequelize.TEXT
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('users');
  }
};