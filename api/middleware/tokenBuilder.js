//Imports
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/secrets')


//Exports; Exposing
function tokenBuilder(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    password: user.password,
    email: user.email,
  }
  const options = {
    expiresIn: '1d',
  }
  const token = jwt.sign(
    payload,
    SECRET,
    options, 
  )
  return token
}


//Exports
module.exports = tokenBuilder
