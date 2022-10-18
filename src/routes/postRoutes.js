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

router.route('/:id')
    .patch(postMiddleware.updatePost, postController.updatePost);

router.route('/like/:id')
    .get(postController.likePost);

router.route('/unlike/:id')
    .get(postController.unlikePost);

module.exports = router;