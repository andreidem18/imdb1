'use strict';

const today = new Date();

const content_actors = [
  {
    actor_id: 1,
    content_id: 1,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 4,
    content_id: 1,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 1,
    content_id: 2,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 8,
    content_id: 2,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 9,
    content_id: 3,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 10,
    content_id: 3,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 3,
    content_id: 4,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 6,
    content_id: 5,
   created_at: today,
   updated_at: today
  },
  {
    actor_id: 7,
    content_id: 5,
   created_at: today,
   updated_at: today
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('content_actors', content_actors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('content_actors', null, {});
  }
};
