const {get, getAll, create, deleteGenre, update} = require('../controllers/genres.controllers');
const {Router} = require('express');
const route = Router();
const verifyToken = require('../middlewares/verifyToken.middlewares.js');

route.get("/genres/:id", verifyToken, get);
route.get("/genres", verifyToken, getAll);
route.post("/genres", verifyToken, create);
route.delete("/genres/:id", verifyToken, deleteGenre);
route.put("/genres/:id", verifyToken, update);

module.exports = route;