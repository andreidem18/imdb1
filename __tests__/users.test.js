const supertest = require("supertest");
const app = require('../src/app');

const request = supertest(app);
let user = {};
let token = "";


describe("Registers", () => {
    it("Successful register of a new user", async(done) => {
        user = {
            firstname: "Lynda",
            lastname: "Smith",
            email: "islynda18@gmail.com",
            password: "lynda123"
        }

        const response = await request.post("/api/v1/users").send(user);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("firstname", "Lynda");
        done();
    });
    it("Failed register of a repited user", async(done) => {
        const response = await request.post("/api/v1/users").send(user);
        expect(response.status).toBe(409);
        done();
    });
    it("Failed register of a user with empty fields", async(done) => {
        user.firstname = "";

        const response = await request.post("/api/v1/users").send(user);

        expect(response.status).toBe(403);
        done();
    });
});



describe("Login", () => {
    it("Successful login", async(done) => {
        user = {
            email: "islynda18@gmail.com",
            password: "lynda123"
        }

        const response = await request.post("/api/v1/login").send(user);
        token = response.body.reset_token;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("firstname", "Lynda");
        done();
    });
    it("Failed login with incorrect credentials", async(done) => {
        user.email = "wrongEmail@gmail.com"

        const response = await request.post("/api/v1/login").send(user);

        expect(response.status).toBe(401);
        done();
    });
    it("Filed register of a user with empty fields", async(done) => {
        user = {
            email: "",
            password: ""
        }

        const response = await request.post("/api/v1/login").send(user);

        expect(response.status).toBe(403);
        done();
    });
});



describe("Token validation", () => {
    it("Valid token", async(done) => {
        const response = await request
            .get("/api/v1/users")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("firstname", "Lynda");
        done();
    });
    it("Invalid token", async(done) => {
        const response = await request
            .get("/api/v1/users")
            .set("Authorization", `Invalid token`);

        expect(response.status).toBe(401);
        done();
    });
});




describe("User options", () => {
    it("To update properties of the user", async(done) => {
        user = {
            firstname: "Lyndanna",
            lastname: "Smith",
            password: "lynda123"
        }
        const response = await request
            .put("/api/v1/users")
            .send(user)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("firstname", "Lyndanna");
        done();
    });
    it("To delete the logged user", async(done) => {
        const response = await request
            .delete("/api/v1/users")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        done();
    });
});
