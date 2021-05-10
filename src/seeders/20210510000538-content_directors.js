'use strict';
const today = new Date();

const content_directors = [
  {
    director_id: 6,
    content_id: 1,
    created_at: today,
    updated_at: today
  },
  {
    director_id: 7,
    content_id: 1,
    created_at: today,
    updated_at: today
  },
  {
    director_id: 8,
    content_id: 2,
    created_at: today,
    updated_at: today
  },
  {
    director_id: 1,
    content_id: 3,
    created_at: today,
    updated_at: today
  },
  {
    director_id: 9,
    content_id: 4,
    created_at: today,
    updated_at: today
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('content_directors', content_directors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('content_directors', null, {});
  }
};
