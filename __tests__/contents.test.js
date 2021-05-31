const supertest = require("supertest");
const app = require('../src/app');

const request = supertest(app);
let token = "";
let movie_id = 0;
let movie = {};

beforeAll(async() => {
    const user = {
        email: "juan@hotmail.com",
        password: "juan123"
    }

    const response = await request.post("/api/v1/login").send(user);
    token = response.body.reset_token;
});



describe("Get movies", () => {
    it("To get 5 movies", async(done) => {
        const response = await request
            .get("/api/v1/contents/?offset=0&limit=5")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.result).toBeInstanceOf(Array);
        expect(response.body.result).toHaveLength(5);
        done();
    });
    it("To get a particular movie", async(done) => {
        const response = await request
            .get("/api/v1/contents/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Suicide Squad");
        expect(response.body.id).toBe(1);
        done();
    });
    it("Failed get of a non-existent movie", async(done) => {
        const response = await request
            .get("/api/v1/contents/1000")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        done();
    });
});


describe("Post movies", () => {
    it("Successful register of a movie", async(done) => {
        movie = {
            title: "Rambo first blood",
            description: "A veteran Green Beret is forced by a cruel Sheriff and his deputies to flee into the mountains and wage an escalating one-man war against his pursuers.",
            total_seasons: 0,
            imdb_score: 7.7,
            relase_date: "1982-10-22",
            play_time: 93,
            photo_link: "https://m.media-amazon.com/images/M/MV5BODBmOWU2YWMtZGUzZi00YzRhLWJjNDAtYTUwNWVkNDcyZmU5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
            imdb_link: "https://www.imdb.com/title/tt0083944/",
            actors: [2],
            directors: [10],
            genres: [2, 6],
        }
        const response = await request
            .post("/api/v1/contents")
            .send(movie)
            .set("Authorization", `Bearer ${token}`);
        movie_id = response.body.content.id;

        expect(response.status).toBe(201);
        expect(response.body.content.title).toBe("Rambo first blood");
        done();
    });

    it("Failed register of a movie by empty fields", async(done) => {
        const movie2 = {
            title: "",
            description: "",
            relase_date: "",
            photo_link: "",
        }
        const response = await request
            .post("/api/v1/contents")
            .send(movie2)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(403);
        done();
    });
});




describe("movie options", () => {
    it("Successful update of a movie", async(done) => {
        movie.description = "Rambo first blood update";

        const response = await request
            .put(`/api/v1/contents/${movie_id}`)
            .send(movie)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.description).toBe("Rambo first blood update");
        done();
    });
    it("Update of a non-existent movie", async(done) => {
        const response = await request
            .put(`/api/v1/contents/1000`)
            .send(movie)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
    it("Successful delete of a movie", async(done) => {
        const response = await request
            .delete(`/api/v1/contents/${movie_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        done();
    });
    it("Delete of a non-existent movie", async(done) => {
        const response = await request
            .delete(`/api/v1/contents/${movie_id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        done();
    });
});