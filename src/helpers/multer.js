const multer = require('multer');
const mimetype = require('mime-types');

const createStorage = (category) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./src/uploads/${category}`);
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
    return multer({storage: storage});
}

module.exports = createStorage;