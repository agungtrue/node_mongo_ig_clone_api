const Post = require('../models/postModel'); // model init
const factoryMethod = require('../services/handlerCommonMethod'); // common method
const CatchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

// create
// exports.createPost = factoryMethod.createOne(Post);
exports.createPost = CatchAsync(async (req, res, next) => {

    // return res.status(200).json({
    //     user: req.user,
    //     body: req.body
    // });

    const payload = {
        ...req.body,
        postedBy: req.user._id,
    };

    const doc = await Post.create(payload)
    res.status(httpStatus.CREATED).json({ 
        status: 'CREATED', 
        data: doc,
    });
});

// update
// exports.updateAlert = factoryMethod.updateOne(Post);

// get all
exports.getAllPosts = factoryMethod.getAll(Post, 'postedBy');

// get one
exports.getOnePost = factoryMethod.getOne(Post);

// delete
exports.deletePost = factoryMethod.deleteOne(Post);