const express = require('express')
const { port=3765, delay=0 } = require('minimist')(process.argv)
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

var server = app.listen(port, () => console.log('Poker server running on port:' + port + ' with a ' + delay/1000 + ' second delay'))
var connections = [];
var chatroom = {};

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Connection made")
    connections.push(socket);







});