//Imports
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config/secrets')


//Exports; Exposing
module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    password: user.password,
    role_name: user.role_name,
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