const CatchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

exports.getAll = (Model, Ref) => CatchAsync(async (req, res, next) => {
    const doc = await Model.find().populate(Ref);

    res.status(httpStatus.OK).json({ 
        status: 'OK', 
        total: doc.length,
        data: doc
    });
});

exports.getOne = Model => CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.find();

    res.status(httpStatus.OK).json({ 
        status: 'success', 
        data: doc
    });
});

exports.createOne = Model => CatchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)
    res.status(httpStatus.CREATED).json({ 
        status: 'CREATED', 
        data: doc,
    });
});

exports.updateOne = Model => CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const doc = await Model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    });
  
    if(!doc) {
        return res.status(httpStatus.NOT_FOUND).json({ status: 'NOT_FOUND', data: null })
    }
  
    res.status(200).json({
        status: 'success',
        message: 'updated!',
        data: doc
    })
});

exports.deleteOne = Model => CatchAsync(async (req, res) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);

    if(!doc) return res.status(404).json({status: 'fail', message: 'id not found!'})

    res.status(204).json({
        status: 'success',
        message: 'deleted!'
    });
});
