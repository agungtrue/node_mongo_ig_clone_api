const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const CatchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const httpStatus = require('http-status');


module.exports = CatchAsync(async (req, res, next) => {
    const { authorization } = req.headers;

    // validate headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(httpStatus.UNAUTHORIZED).json({ status: 'UNAUTHORIZED', message: 'You are not logged in! or check your token'})
    }

    // validate jwt
    const token = authorization.replace("Bearer ", "");
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

     // validate jwt
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            
        if (err) {
            next(new AppError('invalid token!', httpStatus.UNAUTHORIZED));
            return res.status(httpStatus.UNAUTHORIZED).json({ 
                status: 'UNAUTHORIZED',
                error: 'invalid token!'
            });
        }

        const { id } = payload;
        const userLogin = await User.findById(id);
        if (!userLogin) return next(new AppError('user does no longer exist!!', 401));

        // current user validated
        req.user = userLogin;
        next();
    })

    // // find user
    // const checkUser = await User.findById(decoded.id);
    // if(!checkUser) return next(new AppError('user does no longer exist!!', 401));
    
    // next();
});