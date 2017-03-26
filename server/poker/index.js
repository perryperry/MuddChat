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
var playernames=[];
var chatroom = {};
var count = 1;

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    
    if(! connections[socket.username]) {
    	connections[socket.username]=socket;
    	playernames.push(socket.username);
    	count ++;
    	io.sockets.emit("update-players", playernames);
    	console.log("Connection made: " + playernames)
    }

});