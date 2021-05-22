'use strict';

const today = new Date();

const directors = [
  {
    firstname: 'James',
    lastname: 'Wan',
    dob: '1977-02-26',
    biography: 'James Wan is a Malaysian-Australian film director, screenwriter, producer, and comic book writer. He has primarily worked in the horror genre as the co-creator of the Saw and Insidious franchises and the creator of The Conjuring Universe. The lattermost is the second highest-grossing horror franchise at $1.9 billion.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621642185025.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'George',
    lastname: 'Miller',
    dob: '1945-03-03',
    biography: 'George Miller AO is an Australian film director, producer, screenwriter, and physician. He is best known for his Mad Max franchise, whose second installment, Mad Max 2, and fourth, Fury Road, have been hailed as two of the greatest action films of all time; while Fury Road won six Academy Awards.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621642881533.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Night',
    lastname: 'Shyamalan',
    dob: '1970-08-06',
    biography: 'Manoj Nelliyattu "M. Night" Shyamalan is an American filmmaker, philanthropist, and actor. He is known for making original films with contemporary supernatural plots and twist endings. He was born in Pondicherry, Puducherry, India, and raised in Penn Valley, Pennsylvania.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621648984033.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'James',
    lastname: 'Cameron',
    dob: '1954-08-16',
    biography: 'James Francis Cameron CC is a Canadian born film director, producer, screenwriter, editor, artist and environmentalist who currently lives in New Zealand. He is best known for making science fiction and epic films. Cameron first gained recognition for directing The Terminator',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621649181946.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Christopher',
    lastname: 'Nolan',
    dob: '1970-07-30',
    biography: 'Christopher Edward Nolan CBE is a British-American film director, producer, and screenwriter. His directorial efforts have grossed more than US$5 billion worldwide, garnered 36 Oscar nominations and 11 wins. Born and raised in London, Nolan developed an interest in filmmaking from a young age.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621649287991.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'James',
    lastname: 'Gunn',
    dob: '1970-08-05',
    biography: 'James Francis Gunn Jr. is an American film director, actor, producer, and screenwriter. He began his career as a screenwriter in the mid-1990s.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621649353052.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'David',
    lastname: 'Ayer',
    dob: '1968-01-18',
    biography: 'David Ayer is an American filmmaker, best known for making crime films based in Los Angeles and which deal with gangs and police corruption. His screenplays include Training Day, The Fast and the Furious, and S.W.A.T. He has also directed Harsh Times, Street Kings, End of Watch, and Sabotage.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621649621827.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Barry',
    lastname: 'Sonnenfeld',
    dob: '1953-04-01',
    biography: 'Barry Sonnenfeld is an American filmmaker and television director. He originally worked as a cinematographer for the Coen brothers before directing films such as The Addams Family and its sequel Addams Family Values alongside the Men in Black trilogy, Wild Wild West and Get Shorty.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621649704926.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Chad',
    lastname: 'Stahelski',
    dob: '1968-09-20',
    biography: 'Chad Stahelski is an American stuntman and film director. He is known for his work on Buffy the Vampire Slayer and directing the 2014 film John Wick along with David Leitch, as well as solo directing its two sequels.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621649770215.jpeg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Ted',
    lastname: 'Kotcheff',
    dob: '1931-04-07',
    biography: 'William Theodore Kotcheff is a Canadian film and television director and producer, known primarily for his work on British and American television productions such as Armchair Theatre and Law & Order: Special Victims Unit.',
    profile_photo: 'https://imdb3.herokuapp.com/directors/1621649867534.jpeg',
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
