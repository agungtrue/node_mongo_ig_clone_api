const express = require('express');
const router = express.Router();

// controller
const userController = require('../controllers/userController');

// middleware
const userMiddleware = require('../middleware/user.middleware');

// router.patch('/update-password', authController.updatePassword);
// router.get('/me', userController.getMe, userController.getUser)

// User
router
    .route('/')
    .get(userController.getAllUsers)
    .patch(userMiddleware.signup, userController.updateUser);

// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;