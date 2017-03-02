const express = require('express')
const { port=3456, delay=0 } = require('minimist')(process.argv)
const cors = require('cors')

const logger = (req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
}

var http = require('http');

const app = express()
    .use(logger)
    .use(cors())
    .use('/', express.static(__dirname + './dist'))

var server = app.listen(port, () => console.log('Fantasy server running on port:' + port + ' with a ' + delay/1000 + ' second delay'))
var scraper = require('./scraper')(app);