//Imports
const knex = require('knex');
const configs = require('../../knexfile')


//Environment Variables
const environment = process.env.NODE_ENV || 'development';


//Exports; Exposing
module.exports = knex(configs[environment])
