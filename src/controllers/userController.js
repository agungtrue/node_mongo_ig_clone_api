const User = require('../models/userModel'); // model init
const factoryMethod = require('../services/handlerCommonMethod'); // common method

// update
exports.updateUser = factoryMethod.updateOne(User);

// get all
exports.getAllUsers = factoryMethod.getAll(User);

// get one
exports.getOneUser = factoryMethod.getOne(User);

// delete
exports.deleteUser = factoryMethod.deleteOne(User);