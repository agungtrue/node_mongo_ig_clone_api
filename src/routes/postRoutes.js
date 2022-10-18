const express = require('express');
const router = express.Router();

// controller
const postController = require('../controllers/postController');

// middleware
const postMiddleware = require('../middleware/post.middleware');

// Auth router
router.route('/')
    .get(postController.getAllPosts)
    .post(postMiddleware.createPost, postController.createPost);

// router.route('/:id')
//     .patch(postMiddleware.create, postController.updatePost);

module.exports = router;