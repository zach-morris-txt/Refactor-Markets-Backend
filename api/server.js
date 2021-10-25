//Imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./api/auth/auth-router')
const itemsRouter = require('./api/items/items-router')


//Instance Of Express App
const server = express()


//Calling Middleware
server.use(express.json())
server.use(helmet())
server.use(cors())


//Consuming Routers
server.use('/api/auth', authRouter);
server.use('/api/items', itemsRouter);


// "/" Endpoint
server.get('/', (req, res, next) => {
  res.status(200).json(
    `My Landing Page`
  )
})


//Error-Handling Middleware
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});


//Exports; Exposing
module.exports = server
