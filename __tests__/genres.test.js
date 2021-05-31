const supertest = require("supertest");
const app = require('../src/app');

const request = supertest(app);
let token = "";
let genre_id = 0;

beforeAll(async() => {
    const user = {
        email: "juan@hotmail.com",
        password: "juan123"
    }

    const response = await request.post("/api/v1/login").send(user);
    token = response.body.reset_token;
});



describe("Get genres", () => {
    it("To get 5 genres", async(done) => {
        const response = await request
            .get("/api/v1/genres/?offset=0&limit=5")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.result).toBeInstanceOf(Array);
        expect(response.body.result).toHaveLength(5);
        done();
    });
    it("To get a particular genre", async(done) => {
        const response = await request
            .get("/api/v1/genres/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Terror");
        expect(response.body.id).toBe(1);
        done();
    });
    it("Failed get of a non-existent genre", async(done) => {
        const response = await request
            .get("/api/v1/genres/1000")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        done();
    });
});








describe("Post genres", () => {
    it("Successful register of a genre", async(done) => {
        const genre = {
            name: "Science fiction"
        }
        const response = await request
            .post("/api/v1/genres")
            .send(genre)
            .set("Authorization", `Bearer ${token}`);
        genre_id = response.body.genre.id;

        expect(response.status).toBe(201);
        expect(response.body.genre.name).toBe("Science fiction");
        done();
    });

    it("Failed register of an existent genre", async(done) => {
        const genre = {
            name: "Science fiction"
        }
        const response = await request
            .post("/api/v1/genres")
            .send(genre)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(409);
        done();
    });

    it("Failed register of a genre by empty fields", async(done) => {
        const genre = {
            name: ""
        }
        const response = await request
            .post("/api/v1/genres")
            .send(genre)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(403);
        done();
    });
});





describe("Genre options", () => {
    it("Successful update of a genre", async(done) => {
        const genre = {
            name: "Update of Science fiction"
        }
        const response = await request
            .put(`/api/v1/genres/${genre_id}`)
            .send(genre)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Update of Science fiction");
        done();
    });
    it("Update of a non-existent genre", async(done) => {
        const genre = {
            name: "Science fiction"
        }
        const response = await request
            .put(`/api/v1/genres/1000`)
            .send(genre)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
    it("Successful delete of a genre", async(done) => {
        const response = await request
            .delete(`/api/v1/genres/${genre_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        done();
    });
    it("Delete of a non-existent genre", async(done) => {
        const response = await request
            .delete(`/api/v1/genres/${genre_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
})