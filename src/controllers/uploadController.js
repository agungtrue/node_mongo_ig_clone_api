const CatchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

// create
exports.uploadImage = CatchAsync(async (req, res, next) => {
    return res.status(httpStatus.CREATED).json({ 
        status: 'OK', 
        data: req.file,
    });
});