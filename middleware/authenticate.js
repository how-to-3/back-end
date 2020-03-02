const jwt = require('jsonwebtoken');
const { jwtSECRET } = require('../utils/secrets.js');

const restricted = (req, res, next) => {
  const { authorization } = req.headers;

  if(authorization){
    jwt.verify(authorization, jwtSECRET, (err, dcToken) => {
      if(err){
        res.status(401).json({msg: 'Failed to authenticate user'})
      } else {
        req.token = dcToken;
        next();
      }
    })
  } else {
    res.status(400).json({err:'no credentials found'})
  }
};

module.exports = restricted