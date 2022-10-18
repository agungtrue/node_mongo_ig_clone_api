const express = require('express');
const router = express.Router();

// controller
const authController = require('../controllers/authController');

// middleware
const userMiddleware = require('../middleware/user.middleware');

// Auth router
router.post('/signup', userMiddleware.signup, authController.signup);
router.post('/login', userMiddleware.login, authController.login);

module.exports = router;