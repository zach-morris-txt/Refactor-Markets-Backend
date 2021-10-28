//Imports
const knex = require('knex');
const config = require('../../knexfile.js')


//Exports; Exposing
module.exports = knex(config[process.env.NODE_ENV])
