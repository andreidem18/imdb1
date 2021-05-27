const {get, getAll, create, deleteDirector, update, updatePhoto} = require('../controllers/directors.controllers');
const verifyToken = require('../middlewares/verifyToken.middlewares.js');
const {Router} = require('express');
const createStorage = require('../helpers/multer.js');
const route = Router();

route.get("/directors/:id", verifyToken, get);
route.get("/directors", verifyToken, getAll);
route.post("/directors", verifyToken, create);
route.delete("/directors/:id", verifyToken, deleteDirector);
route.put("/directors/:id", verifyToken, update);

const upload = createStorage('directors');
route.put("/directors/:id/profile", upload.single('profile_photo'), updatePhoto);

module.exports = route;