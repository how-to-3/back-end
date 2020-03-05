require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const knex = require('../database/dbConfig');
const cloudinary = require('cloudinary').v2

const restricted = require('../middleware/authenticate');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

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
};

const authRouter = require('../routers/auth-router');
const guideRouter = require('../routers/guideRouter.js');
const stepRouter = require('../routers/stepsRouter.js');

const server = express();

// middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));
server.use(fileUpload({
  useTempFiles: true
}));

// Routes
server.use('/api/auth/', authRouter);
server.use('/api/guides', guideRouter);
server.use('/api/guides', restricted, stepRouter);
server.get('/', (req, res) => {
    res.json({ apiDocs: 'https://documenter.getpostman.com/view/10583912/SzKbLvCk?version=latest'})
});

module.exports = server;