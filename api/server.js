//Imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./routerAuth/auth-router')
const itemsRouter = require('./routerItems/items-router')
const restricted = require('./middleware/restricted')


//Instance Of Express App
const server = express()


//Calling Middleware
server.use(express.json())
server.use(helmet())
server.use(cors())


//Consuming Routers
server.use('/api/auth', authRouter);
server.use('/api/items', restricted, itemsRouter);


// "/" Endpoint
server.get('/', (req, res) => {
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
