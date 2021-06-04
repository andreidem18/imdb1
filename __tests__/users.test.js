const supertest = require("supertest");
const app = require('../src/app');
const {Users} = require("../src/models");

const request = supertest(app);
let user_id = 0;

describe("Registers", () => {
    it("Successfully register of a new user", async(done) => {
        const user = {
            firstname: "Lynda",
            lastname: "Smith",
            email: "islynda18@gmail.com",
            password: "lynda123"
        }

        const response = await request.post("/api/v1/users").send(user);
        user_id = response.body.id;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("firstname", "Lynda");
        done();
    });
    // it("Failed register of a repited user", () => {

    // });
    // it("Filed register of a user with empty fields", () => {

    // });
});

afterAll(async() => {
    await Users.destroy({where: {id: user_id}});
})