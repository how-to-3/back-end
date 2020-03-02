require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const guideRouter = require('../guides/guideRouter.js');

// middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

// Routes
server.use('/api/guides', guideRouter);
server.get('/', (req, res) => {
    res.json({ api: 'is running'})
});

module.exports = server;