const {get, getAll, create, deleteActor, update} = require('../controllers/actors.controllers');
const verifyToken = require('./verifyToken');
const {Router} = require('express');
const route = Router();

route.get("/actors/:id", verifyToken, get);
route.get("/actors", getAll);
route.post("/actors", create);
route.delete("/actors/:id", deleteActor);
route.put("/actors/:id", update);

module.exports = route;