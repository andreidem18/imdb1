const {get, getAll, create, deleteContent, update} = require('../controllers/contents.controllers');
const {Router} = require('express');
const route = Router();

route.get("/contents/:id", get);
route.get("/contents", getAll);
route.post("/contents", create);
route.delete("/contents/:id", deleteContent);
route.put("/contents/:id", update);

module.exports = route;