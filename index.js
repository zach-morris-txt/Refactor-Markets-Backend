//Imports
require('dotenv').config()
const path = require('path')
const express = require('express')

const server = require('./api/server')


//Environment Variables
const PORT = process.env.PORT || 5000;


//Load HTML
server.use(express.static(path.join(__dirname, 'client/dist')))

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})


//Start
server.listen(PORT, () => {
  console.log('Listening On ' + PORT)
})
