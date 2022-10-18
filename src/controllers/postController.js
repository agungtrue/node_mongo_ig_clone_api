const Post = require('../models/postModel'); // model init
const factoryMethod = require('../services/handlerCommonMethod'); // common method
const CatchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

// create
// exports.createPost = factoryMethod.createOne(Post);
exports.createPost = CatchAsync(async (req, res, next) => {

    const payload = {
        ...req.body,
        postedBy: req.user._id,
    };

    const doc = await Post.create(payload)
    res.status(httpStatus.CREATED).json({ 
        status: 'CREATED',
        message: 'Successfully posted!',
        data: doc,
    });
});

exports.updatePost = CatchAsync(async (req, res, next) => {
    const { id: postId } = req.params;
    const { comment } = req.body;
    const { _id: commentBy } = req.user;
    const findPost = await Post.findById(postId)

    if (!findPost) return res.status(httpStatus.NOT_FOUND).json({ status: 'NOT_FOUND', message: 'Post not found' });

    const doc = await Post.findByIdAndUpdate(postId, {
        $push: { comments: { text: comment, commentBy } }
    }, 
    {
        new: true
    });

    return res.status(httpStatus.CREATED).json({ 
        status: 'CREATED',
        message: 'Successfully add comment!',
        data: doc,
    });
});

exports.getAllPosts = CatchAsync(async (req, res, next) => {
    const doc = await Post.find()
        .populate(['postedBy', 'likes.user', 'comments.commentBy'])
        .sort({ createdAt: -1 });


    res.status(httpStatus.OK).json({ 
        status: 'OK', 
        total: doc.length,
        data: doc
    });
});

exports.likePost = CatchAsync(async (req, res, next) => {
    const { id: postId } = req.params;
    const { _id: userId } = req.user;

    const findPost = await Post.findById(postId)
    if (!findPost) return res.status(httpStatus.NOT_FOUND).json({ status: 'NOT_FOUND', message: 'Post not found' });

    const doc = await Post.findByIdAndUpdate(postId, {
        $push: { likes: { user: userId  } }
    }, 
    {
        new: true
    });

    return res.status(httpStatus.CREATED).json({ 
        status: 'CREATED',
        message: 'Successfully liked!',
        data: doc,
    });
});

exports.unlikePost = CatchAsync(async (req, res, next) => {
    const { id: postId } = req.params;
    const { _id: userId } = req.user;
    const { likeId } = req.query;

    const findPost = await Post.findById(postId)
    if (!findPost) return res.status(httpStatus.NOT_FOUND).json({ status: 'NOT_FOUND', message: 'Post not found' });

    // const updateLikes = findPost.filter(({ likes }) => likes.filter(({ user }) => user._id !== userId));

    const doc = await Post.findByIdAndUpdate(postId, {
        $pull: { likes: { _id: likeId  } }
    }, 
    {
        new: true
    });

    return res.status(httpStatus.CREATED).json({ 
        status: 'CREATED',
        message: 'Successfully unliked!',
        data: doc,
        // likeId,
    });
});

// get one
exports.getOnePost = factoryMethod.getOne(Post);

// delete
exports.deletePost = factoryMethod.deleteOne(Post);