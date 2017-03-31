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
        console.log("Wants to connect: " + payload)

        if(! connections[payload]) {
            socket.username = payload;
            socket.isPlaying = false;
            connections[payload] = socket;
            players.push(payload);
            io.sockets.emit("update-players", players);
            console.log("Connections: " + connections.length)
            console.log("Players: " + players)
        } else {
             console.log("Another attempt to connect: " + payload)
        }
    }) 

    socket.on('disconnect', function() {
        console.log('Disconnected from ' + socket.username);
        disconnectPlayer(socket.username);
    });

     socket.on('quit', function(payload) {
        if(connections[payload]) {
            disconnectPlayer(payload);
            io.sockets.emit("update-players", players);
        } 
    })


    socket.on('request-card-game', function(payload) {
        console.log("Game request made from " + socket.username + " to play against: " + payload)
        if(! connections[payload]) {
            console.log(payload + " is not connected, send notice to requester ");
        } else {
            if(! connections[payload].isPlaying) {
                 console.log(payload + " is not playing, sending game request to: " + payload);
                 connections[payload].emit('receive-card-game-request', socket.username);
            } else {
                console.log(payload + " is already playing, sending notice to requester");
            }
        }
    }) 

    socket.on('accept-game-request', function(payload) {
        console.log("acceptance received to play against " + payload);
    });

    socket.on('decline-game-request', function(payload) {
        console.log("declination received not play against " + payload);
    });

});

function disconnectPlayer(username) {
    console.log(username + " is disconnecting");
    connections[username] = null;
    players.splice(username, 1);
    console.log("Removed players: " + players);
     console.log("Connections: " + connections);
}