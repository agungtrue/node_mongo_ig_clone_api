const { make } = require('simple-body-validator');
const httpStatus = require('http-status');
const AppError = require('../utils/appError');

exports.createPost = (req, res, next) => {
    const payload = req.body;

    // basic rules
    const rules = {
        title: 'required|string',
        photo: 'required|string'
    };

    // using simple-body-validator
    const validator = make(payload, rules);

    if (!validator.validate()) {
        next(new AppError('BAD_REQUEST', httpStatus.BAD_REQUEST));

        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: validator.errors().all()
        });
    };

    next();
}

exports.updatePost = (req, res, next) => {
    const payload = req.body;

    // basic rules
    const rules = {
        comment: 'required|string'
    };

    // using simple-body-validator
    const validator = make(payload, rules);

    if (!validator.validate()) {
        next(new AppError('BAD_REQUEST', httpStatus.BAD_REQUEST));

        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: validator.errors().all()
        });
    };

    next();
}
