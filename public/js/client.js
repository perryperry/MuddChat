// Most importantly his file sets up the socket for the other client-side JS
// Also includes general utility functions

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTime() {
    var d = new Date();
    var h = d.getHours() % 12;
    var m = addZero(d.getMinutes());
    var time = h + ":" + m;
    return time;
}

var socket;

$(document).ready(function() { 
	socket = io.connect();
});