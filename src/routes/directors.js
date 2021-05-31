const {get, getAll, create, deleteDirector, update} = require('../controllers/directors.controllers');
const verifyToken = require('../middlewares/verifyToken.middlewares.js');
const {Router} = require('express');
const route = Router();

route.get("/directors/:id", verifyToken, get);
route.get("/directors", verifyToken, getAll);
route.post("/directors", verifyToken, create);
route.delete("/directors/:id", verifyToken, deleteDirector);
route.put("/directors/:id", verifyToken, update);

module.exports = route;