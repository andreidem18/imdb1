const {get, getAll, create, deleteActor, update} = require('../controllers/actors.controllers');
const verifyToken = require('../middlewares/verifyToken.middlewares.js');
const {Router} = require('express');
const route = Router();

route.get("/actors/:id", verifyToken, get);
route.get("/actors", verifyToken, getAll);
route.post("/actors", verifyToken, create);
route.delete("/actors/:id", verifyToken, deleteActor);
route.put("/actors/:id", verifyToken, update);

module.exports = route;