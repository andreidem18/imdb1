'use strict';

const today = new Date();

const genres = [
   {
    name: 'Terror',
    active: true,
    created_at: today,
    updated_at: today
   },
   {
    name: 'Action',
    active: true,
    created_at: today,
    updated_at: today
   },
   {
    name: 'Thriller',
    active: true,
    created_at: today,
    updated_at: today
   },
   {
    name: 'Comedy',
    active: true,
    created_at: today,
    updated_at: today
   },
   {
    name: 'Fantasy',
    active: true,
    created_at: today,
    updated_at: today
   },
   {
    name: 'Adventure',
    active: true,
    created_at: today,
    updated_at: today
   }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('genres', genres, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('genres', null, {});
  }
};
