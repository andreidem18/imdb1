const {get, getAll, create, deleteDirector, update, updatePhoto} = require('../controllers/directors.controllers');
const verifyToken = require('./verifyToken');
const {Router} = require('express');
const multer = require('multer');
const mimetype = require('mime-types');
const route = Router();

route.get("/directors/:id",verifyToken, get);
route.get("/directors",verifyToken, getAll);
route.post("/directors",verifyToken, create);
route.delete("/directors/:id",verifyToken, deleteDirector);
route.put("/directors/:id",verifyToken, update);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads/directors");
    },
    filename: (req, file, cb) => {
        const ext = mimetype.extension(file.mimetype);
        if(ext === "jpg" || ext === "png" || ext === "jpeg"){
            cb(null, `${Date.now()}.${ext}`)
        } else {
            const fileError = new Error("the file type is not allowed");
            cb(fileError, null);
        }
    }
});

const upload = multer({storage: storage});

route.put("/directors/:id/profile", upload.single('profile_photo'), updatePhoto);


module.exports = route;