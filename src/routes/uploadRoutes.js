const express = require('express');
const router = express.Router();
const { multerStorage } = require('../services/fileUpload');
const multer = require("multer");
const upload = multer({
    storage: multerStorage,
});

// controller
const uploadController = require('../controllers/uploadController');

// middleware
const postMiddleware = require('../middleware/upload.middleware');

// Auth router
router.route('/img')
    .post(
        upload.single("file"),
        postMiddleware.uploadImage,
        uploadController.uploadImage
    );
    // .post(upload.array("files"), uploadController.uploadImage);

module.exports = router;