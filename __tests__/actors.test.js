const supertest = require('supertest');
const app = require('../src/app');
const {create} = require('../src/controllers/users.controllers.js');
const {Actors} = require('../src/models/actors.js');

let id = 0;

test("Testing create actors function", async(done) => {
    const today = new Date();
    const actor = {
        firstname: 'Jennifer',
        lastname: 'Aniston',
        dob: '1969-02-11',
        biography: 'Jennifer Joanna Aniston is an American actress, producer, and businesswoman. The daughter of actors John Aniston and Nancy Dow, she began working as an actress at an early age with an uncredited role in the 1988 film Mac and Me; her first major film role came in the 1993 horror comedy Leprechaun.',
        profile_photo: 'https://aws.glamour.mx/prod/designs/v1/assets/1170x967/241453.jpg',
        active: true,
        created_at: today,
        updated_at: today
    }

    let response = await (await supertest(app).post("/api/v1/actors").send(actor));
    id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("firstname", "Jennifer");
    expect(response.body).toHaveProperty("active", true);
    done();
});

afterAll(async () => {
    await Actors.destroy({where: {id}});
})

