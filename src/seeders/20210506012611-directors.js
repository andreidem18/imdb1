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
  },
  {
    firstname: 'James',
    lastname: 'Gunn',
    dob: '1970-08-05',
    biography: 'James Francis Gunn Jr. is an American film director, actor, producer, and screenwriter. He began his career as a screenwriter in the mid-1990s.',
    profile_photo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/James_Gunn_by_Gage_Skidmore_2.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'David',
    lastname: 'Ayer',
    dob: '1968-01-18',
    biography: 'David Ayer is an American filmmaker, best known for making crime films based in Los Angeles and which deal with gangs and police corruption. His screenplays include Training Day, The Fast and the Furious, and S.W.A.T. He has also directed Harsh Times, Street Kings, End of Watch, and Sabotage.',
    profile_photo: 'https://m.media-amazon.com/images/M/MV5BZjBmMTY4M2ItMmEwNC00NTUyLWIyZDEtYWNhNjViNjRiOGVlXkEyXkFqcGdeQXVyMTY2MzU0MjA@._V1_.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Barry',
    lastname: 'Sonnenfeld',
    dob: '1953-04-01',
    biography: 'Barry Sonnenfeld is an American filmmaker and television director. He originally worked as a cinematographer for the Coen brothers before directing films such as The Addams Family and its sequel Addams Family Values alongside the Men in Black trilogy, Wild Wild West and Get Shorty.',
    profile_photo: 'https://static.wikia.nocookie.net/disney/images/a/a6/Barry_Sonnenfeld.jpg/revision/latest?cb=20180724193634',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Chad',
    lastname: 'Stahelski',
    dob: '1968-09-20',
    biography: 'Chad Stahelski is an American stuntman and film director. He is known for his work on Buffy the Vampire Slayer and directing the 2014 film John Wick along with David Leitch, as well as solo directing its two sequels.',
    profile_photo: 'https://discussingfilm.net/wp-content/uploads/2020/06/20200624_100847.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Ted',
    lastname: 'Kotcheff',
    dob: '1931-04-07',
    biography: 'William Theodore Kotcheff is a Canadian film and television director and producer, known primarily for his work on British and American television productions such as Armchair Theatre and Law & Order: Special Victims Unit.',
    profile_photo: 'https://www.dga.org//-/media/Images/Landscape-Images/Visual-History/VH177-Kotcheff/Main.ashx?as=1&h=630&mh=630&mw=1200&w=630&hash=88168DC67A41CA394155504016B74DF5C566692D?t=12345',
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
