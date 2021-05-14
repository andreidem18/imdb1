const {get, getAll, create, deleteUser, update, login, verify} = require('../controllers/users.controllers');
const verifyToken = require('../middlewares/verifyToken.middlewares.js');

const {Router} = require('express');
const route = Router();

route.get("/users/:id", verifyToken, get);
route.get("/users", getAll);
route.post("/users", create);
route.post("/login", login);
route.delete("/users/:id", deleteUser);
route.put("/users/:id", update);
route.get("/verify/:hash", verify);

module.exports = route;