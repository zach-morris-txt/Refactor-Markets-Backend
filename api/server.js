//Imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./api/auth/auth-router')
const itemsRouter = require('./api/items/items-router')


// const db = require('./data/db-config')

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }


//Instance Of Express App
const server = express()


//Calling Middleware
server.use(express.json())
server.use(helmet())
server.use(cors())


//Consuming Routers
server.use('/api/auth', authRouter);
server.use('/api/items', itemsRouter);


//Error-Handling Middleware
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});


//Exports; Exposing
module.exports = server
