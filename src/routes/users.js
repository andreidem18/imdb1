const {get, getAll, create, deleteUser, update, login} = require('../controllers/users.controllers');

const {Router} = require('express');
const route = Router();

route.get("/users/:id", get);
route.get("/users", getAll);
route.post("/users", create);
route.post("/login", login);
route.delete("/users/:id", deleteUser);
route.put("/users/:id", update);

module.exports = route;