'use strict';

const today = new Date();

const actors = [
  {
    firstname: 'Will',
    lastname: 'Smith',
    dob: '1968-09-25',
    biography: 'Willard Carroll Smith Jr. is an American actor, rapper, and film producer. Smith has been nominated for five Golden Globe Awards and two Academy Awards, and has won four Grammy Awards. During the late 1980s, he achieved modest fame as a rapper under the name The Fresh Prince.',
    profile_photo: 'https://www.hola.com/imagenes/belleza/actualidad/20210505188995/will-smith-cambio-fisico/0-948-532/will-smith-gtres2-t.jpg?filter=w600&filter=ds75',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Sylvester',
    lastname: 'Stallone',
    dob: '1946-07-06',
    biography: 'Sylvester Enzio Stallone is an American actor, screenwriter, director, and producer. After his beginnings as a struggling actor for a number of years upon arriving to New York City in 1969.',
    profile_photo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Sylvester_Stallone_2015.JPG',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Keanu',
    lastname: 'Reeves',
    dob: '1964-09-02',
    biography: 'Keanu Charles Reeves is a Canadian actor. Born in Beirut and raised in Toronto, Reeves began acting in theatre productions and in television films before making his feature film debut in Youngblood.',
    profile_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg/1200px-Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Margot',
    lastname: 'Robbie',
    dob: '1990-07-02',
    biography: 'Margot Elise Robbie is an Australian actress and producer. She has received nominations for two Academy Awards, four Golden Globe Awards and five BAFTA Awards.',
    profile_photo: 'https://static.wikia.nocookie.net/batman/images/2/2d/Margot_Robbie.jpg/revision/latest?cb=20150221043636&path-prefix=es',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Dwayne',
    lastname: 'Johnson',
    dob: '1972-05-02',
    biography: 'Dwayne Douglas Johnson, also known by his ring name The Rock, is an American actor, producer, retired professional wrestler, and former American football and Canadian football player.',
    profile_photo: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5NjIyODM0ODM2ODc0Mzc3/dwayne-the-rock-johnson-gettyimages-1061959920.jpg',
    active: true,
    created_at: today,
    updated_at: today
  }
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('actors', actors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('actors', null, {});
  }
};
