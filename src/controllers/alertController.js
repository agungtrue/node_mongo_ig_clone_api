const Alert = require('../models/alertModel'); // model init
const factoryMethod = require('../services/handlerCommonMethod'); // common method

// create
exports.createAlert = factoryMethod.createOne(Alert);

// update
exports.updateAlert = factoryMethod.updateOne(Alert);

// get all
exports.getAllAlerts = factoryMethod.getAll(Alert, 'suspectedReason');

// get one
exports.getOneAlert = factoryMethod.getOne(Alert);

// delete
exports.deleteAlert = factoryMethod.deleteOne(Alert);