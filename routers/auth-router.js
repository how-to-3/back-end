const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const Users = require('../schemes/user-model')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);

      res.status(201).json({ 
        message: `Welcome ${saved.username}, thank you for registering!`, 
        token, 
        user: {
          username: saved.username,
          id: saved.id
        } 
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
   let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ 
          message: `Welcome ${user.username}`, 
          token, 
          user:{
            username: user.username,
            id: user.id
          } 
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    user_id: user.id
  };

  const secret = require('../utils/secrets');

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.jwtSECRET, options); 
}

module.exports = router;
