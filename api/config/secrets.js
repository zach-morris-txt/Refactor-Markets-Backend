//Exports; Exposing Environment Variables
module.exports = {
    SECRET: process.env.SECRET || 'shh',
    PORT: process.env.PORT || 5000
}