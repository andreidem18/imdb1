const supertest = require("supertest");
const app = require('../src/app');

const request = supertest(app);
let token = "";
let director_id = 0;
let director = {};

beforeAll(async() => {
    const user = {
        email: "juan@hotmail.com",
        password: "juan123"
    }

    const response = await request.post("/api/v1/login").send(user);
    token = response.body.reset_token;
});



describe("Get directors", () => {
    it("To get 5 directors", async(done) => {
        const response = await request
            .get("/api/v1/directors/?offset=0&limit=5")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.result).toBeInstanceOf(Array);
        expect(response.body.result).toHaveLength(5);
        done();
    });
    it("To get a particular director", async(done) => {
        const response = await request
            .get("/api/v1/directors/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.firstname).toBe("James");
        expect(response.body.id).toBe(1);
        done();
    });
    it("Failed get of a non-existent director", async(done) => {
        const response = await request
            .get("/api/v1/directors/1000")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        done();
    });
});



describe("Post directors", () => {
    it("Successful register of a director", async(done) => {
        director = {
            firstname: "Anthony",
            lastname: "Russo",
            dob: "1970-02-03",
            biography: "Anthony Russo is a producer and director, known for Avengers: Endgame (2019), Captain America and the winter soldier(2014) and Avengers: Infinity War (2018).",
            profile_photo: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/47/Anthony_Russo.png/revision/latest?cb=20190626172010&path-prefix=es",
            active: true
        }
        const response = await request
            .post("/api/v1/directors")
            .send(director)
            .set("Authorization", `Bearer ${token}`);
        director_id = response.body.director.id;

        expect(response.status).toBe(201);
        expect(response.body.director.firstname).toBe("Anthony");
        done();
    });

    it("Failed register of a director by empty fields", async(done) => {
        const director2 = {
            firstname: "",
            lastname: "",
            dob: "",
            biography: "",
            active: null
        }
        const response = await request
            .post("/api/v1/directors")
            .send(director2)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(403);
        done();
    });
});





describe("director options", () => {
    it("Successful update of a director", async(done) => {
        director.biography = "Anthony Russo Biography update";

        const response = await request
            .put(`/api/v1/directors/${director_id}`)
            .send(director)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.biography).toBe("Anthony Russo Biography update");
        done();
    });
    it("Update of a non-existent director", async(done) => {
        const response = await request
            .put(`/api/v1/directors/1000`)
            .send(director)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
    it("Successful delete of a director", async(done) => {
        const response = await request
            .delete(`/api/v1/directors/${director_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        done();
    });
    it("Delete of a non-existent director", async(done) => {
        const response = await request
            .delete(`/api/v1/directors/${director_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
})