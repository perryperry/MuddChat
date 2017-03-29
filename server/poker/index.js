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
var players=[];
var chatroom = {};
var count = 1;

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.on('join-poker-room', function(payload) {

        if(! connections[payload]) {
            socket.username = payload;
            connections[payload] = socket;
            players.push(payload);
            io.sockets.emit("update-players", players);
            console.log("Joined: " + socket.username)
             console.log("Players: " + players)
        }

    }) 

    socket.on('request-card-game', function(payload) {
   
        console.log("Game request made from: " + socket.username)
    }) 

});