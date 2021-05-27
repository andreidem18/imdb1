const {get, getAll, create, deleteActor, update, updatePhoto} = require('../controllers/actors.controllers');
const verifyToken = require('../middlewares/verifyToken.middlewares.js');
const {Router} = require('express');
const createStorage = require('../helpers/multer.js');
const route = Router();

route.get("/actors/:id", verifyToken, get);
route.get("/actors", verifyToken, getAll);
route.post("/actors", verifyToken, create);
route.delete("/actors/:id", verifyToken, deleteActor);
route.put("/actors/:id", verifyToken, update);

const upload = createStorage('actors');
route.put("/actors/:id/profile", upload.single('profile_photo'), updatePhoto);

module.exports = route;