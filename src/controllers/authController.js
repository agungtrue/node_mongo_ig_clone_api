const User = require('../models/userModel.js');
const { SignToken } = require('../utils/signToken');
const CatchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const httpStatus = require('http-status');

exports.signup = CatchAsync(async (req, res, next) => {

    // check unique user
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        const response = {
            status: 'BAD_REQUEST',
            message: 'Email already registered',
        }

        // appError for developer debugging purposes
        next(new AppError(response.message, httpStatus.BAD_REQUEST));

        // for client response purposes
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }

    // create user
    const newUser = await User.create(req.body);

    // adding new token
    const token = SignToken(newUser._id);

    // remove password from displayed
    newUser.password = undefined;

    res.status(httpStatus.CREATED).json({
        status: 'success',
        data: { user: newUser },
        token
    })
});

exports.login = CatchAsync(async (req, res, next) => {
    // user request payload
    const { email, password } = req.body;

    // get current user password
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new AppError('Incorrect email!!', httpStatus.BAD_REQUEST));

    // validate with existing password
    const validatePassword = await user.validatePassword(password, user.password);
    if (!validatePassword) {
        next(new AppError('Incorrect password!!', httpStatus.BAD_REQUEST));
        return res.status(httpStatus.BAD_REQUEST).json({
            status: 'BAD_REQUEST',
            message: 'Incorrect password!!'
        });
    }

    // remove password from response
    user.password = undefined;

    // assign token
    const token = SignToken(user._id)

    res.status(200).json({
        status: 'success',
        user,
        token
    })
});

exports.updatePassword = CatchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { currentPassword: password, newPassword, newPasswordConfirm } = req.body;

    const user = await User.findOne({_id}).select('+password');

    const validatePassword = await user.validatePassword(password, user.password);
    if(!validatePassword) return next(new AppError('your current password are not same!!', 400));

    //update password
    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;

    await user.save();

    //sign new token
    const token = SignToken(user._id)

    res.status(201).json({
        status: 'success',
        token
    });
})