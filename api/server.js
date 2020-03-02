require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const KnexStore = require('connect-session-knex')(session)
const knex = require('../database/dbConfig')

const sessionConfig = {
  name:'session-cookie',
  secret: 'sprint',
  resave: false,
  saveUninitialized: true, 
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true 
  },
  store:new KnexStore({
    knex,
    tablename:'sessions',
    createtable:true,
    sidfieldname:'sid',
    clearInterval: 1000 * 60 * 10,
    
  })
}

const authenticate = require('../middleware/authenticate')
const testRouter = require('../routers/test-router')
const authRouter = require('../routers/auth-router')

const server = express();

const guideRouter = require('../guides/guideRouter.js');

// middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

// routes
server.use('/api/', authenticate, testRouter)
server.use('/api/auth/', authRouter)

// Routes
server.use('/api/guides', guideRouter);
server.get('/', (req, res) => {
    res.json({ api: 'is running'})
});

module.exports = server;