'use strict';

const today = new Date();

const content_genres = [
  {
    genre_id: 2,
    content_id: 1,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 6,
    content_id: 1,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 6,
    content_id: 2,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 2,
    content_id: 2,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 4,
    content_id: 2,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 1,
    content_id: 3,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 3,
    content_id: 3,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 2,
    content_id: 4,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 3,
    content_id: 4,
    created_at: today,
    updated_at: today
  },
  {
    genre_id: 4,
    content_id: 5,
    created_at: today,
    updated_at: today
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('content_genres', content_genres, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('content_genres', null, {});
  }
};
