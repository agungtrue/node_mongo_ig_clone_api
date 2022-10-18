const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: 'assets/uploads',
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split("/")[1];
        callback(null, `images-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

module.exports = {
    multerStorage
};