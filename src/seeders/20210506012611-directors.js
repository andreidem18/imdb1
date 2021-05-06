'use strict';

const today = new Date();

const directors = [
  {
    firstname: 'James',
    lastname: 'Wan',
    dob: '1977-02-26',
    biography: 'James Wan is a Malaysian-Australian film director, screenwriter, producer, and comic book writer. He has primarily worked in the horror genre as the co-creator of the Saw and Insidious franchises and the creator of The Conjuring Universe. The lattermost is the second highest-grossing horror franchise at $1.9 billion.',
    profile_photo: 'https://deadline.com/wp-content/uploads/2020/03/james-wan.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'George',
    lastname: 'Miller',
    dob: '1945-03-03',
    biography: 'George Miller AO is an Australian film director, producer, screenwriter, and physician. He is best known for his Mad Max franchise, whose second installment, Mad Max 2, and fourth, Fury Road, have been hailed as two of the greatest action films of all time; while Fury Road won six Academy Awards.',
    profile_photo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/George_Miller_%2835706244922%29.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Night',
    lastname: 'Shyamalan',
    dob: '1970-08-06',
    biography: 'Manoj Nelliyattu "M. Night" Shyamalan is an American filmmaker, philanthropist, and actor. He is known for making original films with contemporary supernatural plots and twist endings. He was born in Pondicherry, Puducherry, India, and raised in Penn Valley, Pennsylvania.',
    profile_photo: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/m-night-shyamalan-proximas-peliculas-1575361219.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'James',
    lastname: 'Cameron',
    dob: '1954-08-16',
    biography: 'James Francis Cameron CC is a Canadian born film director, producer, screenwriter, editor, artist and environmentalist who currently lives in New Zealand. He is best known for making science fiction and epic films. Cameron first gained recognition for directing The Terminator',
    profile_photo: 'https://media.vanityfair.com/photos/5a15cfcf1310ef0d93e09716/master/pass/james-cameron-embed.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Christopher',
    lastname: 'Nolan',
    dob: '1970-07-30',
    biography: 'Christopher Edward Nolan CBE is a British-American film director, producer, and screenwriter. His directorial efforts have grossed more than US$5 billion worldwide, garnered 36 Oscar nominations and 11 wins. Born and raised in London, Nolan developed an interest in filmmaking from a young age.',
    profile_photo: 'https://cdn.elnacional.com/wp-content/uploads/2020/12/TELEMMGLPICT000235925366_trans_NvBQzQNjv4BqM37qcIWR9CtrqmiMdQVx7JYz1FdUY_87Dr9Bu-92cbg.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('directors', directors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('directors', null, {});
  }
};
