const {get, getAll, create, deleteActor, update, updatePhoto} = require('../controllers/actors.controllers');
const verifyToken = require('../middlewares/verifyToken.middlewares.js');
const {Router} = require('express');
const multer = require('multer');
const mimetype = require('mime-types');
const route = Router();

route.get("/actors/:id", verifyToken, get);
route.get("/actors", getAll);
route.post("/actors", create);
route.delete("/actors/:id", deleteActor);
route.put("/actors/:id", update);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads/actors");
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

route.put("/actors/:id/profile", upload.single('profile_photo'), updatePhoto);



module.exports = route;