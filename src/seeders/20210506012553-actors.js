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
  },
  {
    firstname: 'Jennifer',
    lastname: 'Aniston',
    dob: '1969-02-11',
    biography: 'Jennifer Joanna Aniston is an American actress, producer, and businesswoman. The daughter of actors John Aniston and Nancy Dow, she began working as an actress at an early age with an uncredited role in the 1988 film Mac and Me; her first major film role came in the 1993 horror comedy Leprechaun.',
    profile_photo: 'https://aws.glamour.mx/prod/designs/v1/assets/1170x967/241453.jpg',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Matthew',
    lastname: 'Perry',
    dob: '1969-08-19',
    biography: 'Matthew Langford Perry is a Canadian American actor, comedian, executive producer, screenwriter, and playwright who played the role of Chandler Bing on the NBC television sitcom Friends, which ran from 1994 to 2004.',
    profile_photo: 'https://akns-images.eonline.com/eol_images/Entire_Site/20201026/rs_1200x1200-201126121835-1200-Matthew_Perry-engaged.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Thomas',
    lastname: 'Jones',
    dob: '1946-09-15',
    biography: 'Thomas Lee Jones is an American actor and film director. He has received four Academy Award nominations, winning the Best Supporting Actor Oscar for his performance as U.S. Marshal Samuel Gerard in the 1993 thriller film The Fugitive.',
    profile_photo: 'https://images.mubicdn.net/images/cast_member/2242/cache-2553-1561582001/image-w856.jpg?size=800x',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Vera',
    lastname: 'Farmiga',
    dob: '1973-08-06',
    biography: 'Vera Ann Farmiga is an American actress, director, and producer. She began her professional acting career on stage in the original Broadway production of Taking Sides. Farmiga made her television debut in the Fox fantasy adventure series Roar, and her feature film debut in the drama-thriller Return to Paradise.',
    profile_photo: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2d/Vera_Farmiga.png/revision/latest?cb=20201204114028&path-prefix=es',
    active: true,
    created_at: today,
    updated_at: today
  },
  {
    firstname: 'Patrick',
    lastname: 'Wilson',
    dob: '1973-07-03',
    biography: 'Patrick Joseph Wilson is an American actor, singer, and director. He spent his early career starring in Broadway musicals, beginning in 1995. He is a two-time Tony Award nominee for his roles in The Full Monty and Oklahoma.',
    profile_photo: 'https://pyxis.nymag.com/v1/imgs/b02/2ce/bab87210df995bbb26d142e0caf0f9c095-patrick-wilson.rsquare.w1200.jpg',
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
