const Users = require('./auth-model')
const bcrypt = require('bcryptjs')

const checkId = (req, res, next) => {
    const id = req.params.user_id
    Users.findById(id)
    .then(user => {
        if(!user) {
            res.status(404).json({
                message: `User doesn't exist`
            })
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

const confirmUser = (req, res, next) => {
    const {username, password, email} = req.body
    if (
        !username || username.trim() === null
        || !password || password.trim() === null
        || !email || email.trim() === null
    ) {
        res.status(400).json({
            message: `All users must have a username, password, and email.`
        })
    } else {
        next()
    }
}

const confirmLoginFields = (req, res, next) => {
    const {username, password} = req.body
    if (
        !username || username.trim() === null
        || !password || password.trim() === null
    ) {
        res.status(422).json({
            message: `Username and password required`
        })
    } else {
        next()
    }
}

const verifyLogin = (req, res, next) => {
    const {username, password} = req.body
  
    Users.findBy({username})
    .then(([user]) => {
        const token = bcrypt.hashSync(password, 8)
        if (user && bcrypt.compareSync(password, user.password)) {
            next()
        } else {
            res.status(401).json({
                message: `invalid credentials`, token
            })
        }
    })
}

const verifyUniqueUsername = (req, res, next) => {
    const {username} = req.body
    Users.findBy({username})
    .then(([username]) => {
        if(username) {
            res.status(422).json({
                message: `Username already exists`
            })
        } else {
            next()
        }
    })
}

const verifyUniqueEmail = (req, res, next) => {
    const {email} = req.body
    Users.findBy({email})
    .then(([email]) => {
        if(email) {
            res.status(422).json({
                message: `Email already taken`
            })
        } else {
            next()
        }
    })
}

module.exports = {
    checkId,
    confirmUser,
    confirmLoginFields,
    verifyLogin,
    verifyUniqueUsername,
    verifyUniqueEmail
}