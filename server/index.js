const express = require('express')
const { port=3333, delay=0 } = require('minimist')(process.argv)
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

var server = app.listen(port, () => console.log('Mudd butt server running on port:' + port + ' with a ' + delay/1000 + ' second delay'))
var connections = [];
var chatroom = {};

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Connection made")
    connections.push(socket);

    socket.once('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log("Disconnected: %s sockets remaining.", connections.length);
    });

    socket.on('join', function(payload) {
        // var newMember = {
        //     id: this.id,
        //     name: payload.name,
        // };
        // this.emit('joined', newMember);
        // chatroom.push(newMember);
        // io.sockets.emit('newMember', chatroom);
        console.log("Member Joined: %s", payload.name);
    });

     socket.on('send-msg', function(payload) {
        console.log("Message received: %s", payload);
    });
});