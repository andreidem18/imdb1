const {get, getAll, create, deleteGenre, update} = require('../controllers/genres.controllers');
const {Router} = require('express');
const route = Router();

route.get("/genres/:id", get);
route.get("/genres", getAll);
route.post("/genres", create);
route.delete("/genres/:id", deleteGenre);
route.put("/genres/:id", update);

module.exports = route;