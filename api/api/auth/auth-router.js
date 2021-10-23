//Imports
const bcrypt = require('bcryptjs')

const router = require('express').Router()
const Users = require('./users-model')
const md = require('../middleware/middleware')
const tokenBuilder = require('../middleware/tokenBuilder')


//Ednpoints
router.post('/register', 
  md.requireUsernamePassword, 
  md.checkUsernameTaken, 
  md.validateRoleName,

  (req, res, next) => {
    const { username, password } = req.body
    const { role_name } = req
    const hash = bcrypt.hashSync(password, 8);

    Users.add({ username, password: hash, role_name })
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(next);
});

router.post('/login', 
  md.requireUsernamePassword, 
  md.checkUsernamePasswordExist, 
  (req, res, next) => {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
      const token = tokenBuilder(req.user);
           
      res.status(200).json({
        message: `Welcome, ${req.user.username}`,
        token,
      });
    } else {
      next({
        status: 401,
        message: 'Invalid Credentials' 
      });
    }
});


//Exports; Exposing
module.exports = router;