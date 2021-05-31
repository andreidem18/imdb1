const supertest = require("supertest");
const app = require('../src/app');

const request = supertest(app);
let token = "";
let actor_id = 0;
let actor = {};

beforeAll(async() => {
    const user = {
        email: "juan@hotmail.com",
        password: "juan123"
    }

    const response = await request.post("/api/v1/login").send(user);
    token = response.body.reset_token;
});



describe("Get actors", () => {
    it("To get 5 actors", async(done) => {
        const response = await request
            .get("/api/v1/actors/?offset=0&limit=5")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.result).toBeInstanceOf(Array);
        expect(response.body.result).toHaveLength(5);
        done();
    });
    it("To get a particular actor", async(done) => {
        const response = await request
            .get("/api/v1/actors/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.firstname).toBe("Will");
        expect(response.body.id).toBe(1);
        done();
    });
    it("Failed get of a non-existent actor", async(done) => {
        const response = await request
            .get("/api/v1/actors/1000")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        done();
    });
});



describe("Post actors", () => {
    it("Successful register of a actor", async(done) => {
        actor = {
            firstname: "Tom",
            lastname: "Cruise",
            dob: "1962-07-03",
            biography: "Thomas Cruise Mapother IV is an American actor and produces. He has received various accolades for his work. He is one of the highest-apid actors in the world.",
            profile_photo: "https://images.mubicdn.net/images/cast_member/2184/cache-2992-1547409411/image-w856.jpg?size=800x",
            active: true
        }
        const response = await request
            .post("/api/v1/actors")
            .send(actor)
            .set("Authorization", `Bearer ${token}`);
        actor_id = response.body.actor.id;

        expect(response.status).toBe(201);
        expect(response.body.actor.firstname).toBe("Tom");
        done();
    });

    it("Failed register of a actor by empty fields", async(done) => {
        const actor2 = {
            firstname: "",
            lastname: "",
            dob: "",
            biography: "",
            active: null
        }
        const response = await request
            .post("/api/v1/actors")
            .send(actor2)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(403);
        done();
    });
});





describe("actor options", () => {
    it("Successful update of a actor", async(done) => {
        actor.biography = "Tom Cruise Biography update";

        const response = await request
            .put(`/api/v1/actors/${actor_id}`)
            .send(actor)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.biography).toBe("Tom Cruise Biography update");
        done();
    });
    it("Update of a non-existent actor", async(done) => {
        const response = await request
            .put(`/api/v1/actors/1000`)
            .send(actor)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
    it("Successful delete of a actor", async(done) => {
        const response = await request
            .delete(`/api/v1/actors/${actor_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        done();
    });
    it("Delete of a non-existent actor", async(done) => {
        const response = await request
            .delete(`/api/v1/actors/${actor_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
})