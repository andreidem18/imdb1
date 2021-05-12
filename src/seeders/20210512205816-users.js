'use strict';

const today = new Date();

const users = [
  {
    firstname: 'Juan',
    lastname: 'Conte',
    email: 'juan@hotmail.com',
    password: '$2a$10$wrhasuRMMteajHi3Jqy19OEAJjLHzK8wm4/ZKtNY7n/tN/pQtu4vG',
    created_at: today,
    updated_at: today
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
