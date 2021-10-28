//Imports
const bcrypt = require('bcryptjs')

const router = require('express').Router()
const Users = require('./auth-model')
const tokenBuilder = require('../middleware/tokenBuilder')
const restricted = require('../middleware/restricted')
const {
      checkId,
      confirmUser,
      confirmLoginFields,
      verifyLogin,
      verifyUniqueUsername,
      verifyUniqueEmail
} = require('./middleware')


//Endpoints
router.get('/', restricted, (req, res, next) => {
  Users.findAll()
  .then(users => {
      res.json(users)
  })
  .catch(next)
})

router.get('/:user_id', restricted, checkId, (req, res, next) => {
  const {user_id} = req.params
  Users.findById(user_id)
  .then(user => {
      res.json(user)
  })
  .catch(next)
})

router.get('/:user_id/items', restricted, checkId, (req, res, next) => {
  const {user_id} = req.params
  Users.findItemsById(user_id)
  .then(user => {
      res.json(user)
  })
  .catch(next)
})

router.post('/register', confirmUser,
                        verifyUniqueUsername,
                        verifyUniqueEmail,
  (req, res, next) => {
    const {username, password, email} = req.body
    const trimUser = username.trim()
    const hash = bcrypt.hashSync(password, 8)

    Users.addUser({username: trimUser, password: hash, email})
    .then(user => {
        res.status(201).json(user)
    })
    .catch(next)
})

router.post('/login', confirmLoginFields, verifyLogin, (req, res, next) => {
    const {username} = req.body

    Users.findBy({username})
    .then(([user]) => {
        const token = tokenBuilder(user)
        const user_id = user.user_id
        res.json({
            message: `Login successful`,
            user_id,
            token 
        })
    })
    .catch(next)
})

router.put('/:user_id', restricted, checkId, confirmUser, (req, res, next) => {
    const {username, password, email} = req.body
    const hash = bcrypt.hashSync(password, 8)

    Users.update(req.params, {username, password: hash, email})
    .then(() => {
        res.status(200).json(req.body)
    })
    .catch(next)
})

router.delete('/:user_id', restricted, checkId, (req, res, next) => {
    Users.remove(req.params.user_id)
    .then(() => {
        res.status(200).json({
            message: `Sorry you hate items.`
        })
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})


//Exports; Exposing
module.exports = router;