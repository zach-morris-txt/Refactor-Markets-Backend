//Imports
const jwt = require('jsonwebtoken')
const { SECRET } = require("../config/secrets")


//Exports; Exposing
module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: `token invalid`
          })
        } else {
          req.decodedJwt = decoded
          next()
        } 
      }) 
    } else {
      res.status(401).json({
        message: `token required`
      })
    }
};