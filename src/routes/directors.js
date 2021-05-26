const {get, getAll, create, deleteDirector, update, updatePhoto} = require('../controllers/directors.controllers');
const {Router} = require('express');
const createStorage = require('../helpers/multer.js');
const route = Router();

route.get("/directors/:id", get);
route.get("/directors", getAll);
route.post("/directors", create);
route.delete("/directors/:id", deleteDirector);
route.put("/directors/:id", update);

const upload = createStorage('directors');
route.put("/directors/:id/profile", upload.single('profile_photo'), updatePhoto);


module.exports = route;