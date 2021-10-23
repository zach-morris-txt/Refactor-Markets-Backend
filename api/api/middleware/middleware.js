//Imports
const { findBy } = require('../auth/users-model')


//Middleware
    //Missing Inputs
const requireUsernamePassword = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({
        message: 'Username And Password Required',
      });
  } else {
    next()
  }
}
    //Unique Username
async function checkUsernameTaken(req, res, next) {
  try {
    const users = await findBy({username: req.body.username })
    if(!users.length) {
      next()
    } else {
      next({
        status: 422,
        message: "Username Taken"
      })    
    }
  } catch (err) {
    next(err)
  }
}
    //Admin Access
const only = role_name => (req, res, next) => {
  if(role_name === req.decodedToken.role_name) {
    next()
  } else {
    next({
      status: 403,
      message: 'This Is Not For You'
    })
  }
}
    //Validate Role
const validateRoleName = (req, res, next) => {
  if(!req.body.role_name || !req.body.role_name.trim()) {
    req.role_name = 'User'
    next()
  } else if (req.body.role_name.trim() === 'Admin') {
    next({
      status: 422,
      message: 'Role Name Can Not Be Admin'
    })
  } else if (req.body.role_name.trim().length > 32) {
    next({
      status: 422,
      message: 'Role Name Can Not Be Longer Than 32 Chars'
    })
  } else {
    req.role_name = req.body.role_name.trim()
    next()
  }
}
    //Exists Username & Password
const checkUsernamePasswordExist = async (req, res, next) => {
  try {
    const [user] = await findBy({ username: req.body.username })
    if(!user || !user.password) {
      next({
        status: 401,
        message: 'Invalid Credentials'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}


//Exports; Exposing
module.exports = {
    requireUsernamePassword,
    checkUsernameTaken,
    only,
    validateRoleName,
    checkUsernamePasswordExist,
}