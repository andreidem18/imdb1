const {get, getAll, create, deleteContent, update} = require('../controllers/contents.controllers');
const {Router} = require('express');
const route = Router();
const verifyToken = require('../middlewares/verifyToken.middlewares.js');

route.get("/contents/:id", verifyToken, get);
route.get("/contents", verifyToken, getAll);
route.post("/contents", verifyToken, create);
route.delete("/contents/:id", verifyToken, deleteContent);
route.put("/contents/:id", verifyToken, update);

module.exports = route;