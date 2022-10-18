const express = require('express');
const app = express();
const router = express.Router();
const validateJWT = require('../middleware/validateJwt');
const httpStatus = require('http-status');

// mounting all routes
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const uploadRoutes = require('./uploadRoutes');

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'ok', message: 'welcome to API server'})
});

// auth
router.use('/auth', authRoutes);

// JWT validation
router.use('/api', validateJWT);

// users
router.use('/api/users', userRoutes);

// post
router.use('/api/post', postRoutes);

router.use('/api/upload', uploadRoutes);

// any request handler
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: httpStatus.NOT_FOUND, message: 'cannot find any resources' });
})

module.exports = router;