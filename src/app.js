const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const { join } = require('path')

// express init
const app = express();
app.use(express.json());

// .env init
const dotenv = require('dotenv');
dotenv.config();

// cors init
app.use(cors());
app.options('*', cors());

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// load assets
app.use('/assets', express.static(join(__dirname, '..', 'assets')));

// noSql injection
app.use(mongoSanitize());

// routers
const routers = require('./routes');

// router init
app.use(routers);

module.exports = app;