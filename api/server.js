require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.json({ api: 'is running'})
});

module.exports = server;