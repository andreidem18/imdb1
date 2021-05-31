const {get, create, deleteUser, update, login, verify} = require('../controllers/users.controllers');
const verifyToken = require('../middlewares/verifyToken.middlewares.js');

const {Router} = require('express');
const route = Router();

route.get("/users", verifyToken, get);
route.post("/users", create);
route.post("/login", login);
route.delete("/users", verifyToken, deleteUser);
route.put("/users", verifyToken, update);
route.get("/verify/:hash", verify);

module.exports = route;