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

    console.log("Connection made: "  +  socket.id)
    
    connections.push(socket);

    console.log("Connections: "  +  connections)

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
        console.log("Member Joined: %s", payload);
    });

     socket.on('send-msg', function(payload) {
        payload.time = getTime();
        console.log("Message received at %s from %s: %s, and emoji: %s", payload.time, payload.username, payload.msg, payload.emoji);
        socket.broadcast.emit('receive-message', payload);
    });
});
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getTime() {
    var d = new Date();
    var h = d.getHours(); 
    var ampm = (h > 11) ? "pm" : "am";
    h = h % 12;
    var m = addZero(d.getMinutes());
    var time = h + ":" + m + " " + ampm;
    return time;
}