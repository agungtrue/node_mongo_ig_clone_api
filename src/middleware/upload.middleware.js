const { make } = require('simple-body-validator');
const httpStatus = require('http-status');
const AppError = require('../utils/appError');

exports.uploadImage = (req, res, next) => {
    const { mimetype } = req.file;

    // basic rules
    if (mimetype.includes('png') || mimetype.includes('jpeg')) {
        next();
    } else {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: 'BAD_REQUEST',
            message: 'image should be png or jpeg'
        });
    }
}
