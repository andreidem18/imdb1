'use strict';

const today = new Date();

const contents = [
  {
    title: "Suicide Squad",
    description: "A secret government agency recruits some of the most dangerous incarcerated super-villains to form a defensive task force. Their first mission: save the world from the apocalypse.",
    total_seasons: 0,
    imdb_score: 5.9,
    relase_date: '2016-08-01',
    play_time: 123,
    photo_link: 'https://images-na.ssl-images-amazon.com/images/I/81NyY90J0fL._SY679_.jpg',
    imdb_link: 'https://www.imdb.com/title/tt1386697/',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    title: 'Men in Black',
    description: 'A police officer joins a secret organization that polices and monitors extraterrestrial interactions on Earth.',
    total_seasons: 0,
    imdb_score: 7.3,
   relase_date: '1997-07-02',
    play_time: 98,
    photo_link: 'https://flxt.tmsimg.com/assets/p19526_p_v10_av.jpg',
    imdb_link: 'https://www.imdb.com/title/tt0119654/',
    active: true,
    created_at: today,
    updated_at: today
  }, 
  {
    title: 'The Conjuring',
    description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    total_seasons: 0,
    imdb_score: 7.5,
   relase_date: '2013-07-19',
    play_time: 112,
    photo_link: 'https://i.ytimg.com/vi/aKzxlgrkEqs/movieposter.jpg',
    imdb_link: 'https://www.imdb.com/title/tt1457767/',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    title: 'John Wick',
    description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
    total_seasons: 0,
    imdb_score: 7.4,
   relase_date: '2014-10-24',
    play_time: 101,
    photo_link: 'https://images-na.ssl-images-amazon.com/images/I/4191V0QIFmL.jpg',
    imdb_link: 'https://www.imdb.com/title/tt2911666/',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    title: 'Friends',
    description: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    total_seasons: 10,
    imdb_score: 8.9,
   relase_date: '1994-10-22',
    play_time: 22,
    photo_link: 'https://media2.fdncms.com/ntslo/imager/u/original/8764372/musicartsculture_movies2-1-dec5f3efa10728c3.jpg',
    imdb_link: 'https://www.imdb.com/title/tt0108778/',
    active: true,
    created_at: today,
    updated_at: today
}
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('contents', contents, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contents', null, {});
  }
};
