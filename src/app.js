const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// noSql injection
app.use(mongoSanitize());

// routers
const routers = require('./routes');

// router init
app.use(routers);

module.exports = app;