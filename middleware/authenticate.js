const jwt = require('jsonwebtoken');
const { jwtSECRET } = require('../utils/secrets.js');

const restricted = (req, res, next) => {
  const {authorization} = req.headers;

  if(authorization){
      jwt.verify(authorization, jwtSECRET, (err, decodedToken) => {
          if (err) {
              res.status(401).json({msg: 'Invalid Credentials'})
          } else {
              req.decodedToken = decodedToken;
              next();
          }
      })
  } else {
      res.status(400).json({err:'please provide user credentials'})
  };
};

module.exports = restricted