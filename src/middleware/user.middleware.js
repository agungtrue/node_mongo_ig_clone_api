const { make } = require('simple-body-validator');
const httpStatus = require('http-status');
const AppError = require('../utils/appError');

exports.signup = (req, res, next) => {
    const payload = req.body;

    // basic rules
    const rules = {
        name: 'required|string|min:3',
        email: 'required|email',
        password: 'required|string|min:8',
        passwordConfirm: 'required|string|min:3',
    };

    // other logic
    if (payload.password !== payload.passwordConfirm) {
        next(new AppError('password confirm are not same!', httpStatus.BAD_REQUEST));
        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: {
                password: ['password confirm are not same!']
            }
        });
    };

    // using simple-body-validator
    const validator = make(payload, rules);

    if (!validator.validate()) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: validator.errors().all()
        });
    };

    next();
};

exports.login = (req, res, next) => {
    const payload = req.body;

    // basic rules
    const rules = {
        email: 'required|email',
        password: 'required|string|min:8',
    };

    // using simple-body-validator
    const validator = make(payload, rules);

    if (!validator.validate()) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: validator.errors().all()
        });
    };

    next();
};