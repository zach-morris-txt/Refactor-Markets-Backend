//Imports
require('dotenv').config()
const server = require('./api/server')


//Environment Variables
const port = process.env.PORT


//Start
server.listen(port, () => {
  console.log('listening on ' + port)
})
