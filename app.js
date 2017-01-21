var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	path = require('path'),
	users = {};

server.listen(3000);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico', express.static('pics/favicon.ico'));

io.on('connection', function(socket) {

	socket.on('new user', function(data, callback) {
		if(data in users) {
			console.log("Denying " + data + "access to the chat");
			callback(false);
		} else {
			console.log("Adding " + data + " to the chat");
			callback(true);
			socket.nickname = data;
			users[socket.nickname] = socket;
			updateNicknames();
			fillDeck(socket);
		}

	});

	// receive socket's message
	socket.on('send-message', function(data, callback){
		console.log("Received data from: " + data.username);

		socket.nickname = data.username;
		users[socket.nickname] = socket;

		var emoji = data.emoji;
		var msg = data.msg.trim();
		// check if private message, protol is @username
		if(msg.substr(0,1) === '@'){
			msg = msg.substr(1);
			var ind = msg.indexOf(' ');
			if(ind != -1) {
				// check if user name is valid
				var name = msg.substring(0,ind);
				var msg = msg.substring(ind + 1);
				if(name in users) 
				{
					users[name].emit('private-message', {msg: data.msg, emoji: data.emoji, nick: socket.nickname});
					users[socket.nickname].emit('private-message', {msg: data.msg, emoji: data.emoji, nick: socket.nickname}); 
					console.log('private message');	
				} else {
					callback({ nick: 'admin', emoji:'/pics/emoji/emoji28.png', msg:'> private message requires valid @username'});
				}
				
			} else {
				callback({ nick: 'admin', emoji:'/pics/emojis/emoji28.png', msg:'> private message requires valid @username'});
			}
		} else {
			if(! users[socket.nickname]) {

			}

			// sends to everyone, including this client
			io.sockets.emit('new-message', {msg: data.msg, emoji: data.emoji,  nick: socket.nickname});
			// would send to everyone else, except this client
			// socket.broadcast.emit('new-message', data);
		}
 
	});

	// receive client's image url and broadcast it to the chatroom
	socket.on('paste-image-url', function(data, callback){
		var url = data.trim();
		console.log("Received image url from " + socket.nickname +": " + url);
		io.sockets.emit('new-image', {url: url, nick: socket.nickname});
	});

	// when user disconnects
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateNicknames();
	});

	function updateNicknames(){
		io.sockets.emit('usernames', Object.keys(users));
	}


// #############################################################################################################################
															//	5 hand card game
// ##################################################################################################################################


// NOTE:
// Need to not start over the deck each time.

// testing card recognition
socket.on('request-card-game', function(data) {
	console.log(socket.nickname + " requesting a poker game against " + data);
	if(! socket.isPlaying) {
		if(users[data]) {
			console.log("Opponent " + data + " found, starting game...");
			socket.opponent = data;
			socket.isPlaying = true;
			users[socket.opponent].isPlaying = true;
			users[socket.opponent].opponent = socket.nickname;
			var cards = dealCards(socket);
			var cardsVs = dealCards(socket);
			users[socket.nickname].emit('receive-cards', cards);
			users[socket.opponent].emit('receive-cards', cardsVs);
		} else {
			console.log("Opponent not found");
			//users[socket.nickname].emit('opponent-not-found', {msg: data.msg, emoji: data.emoji, nick: socket.nickname});
		}
	}
});

socket.on('send-card-played', function(data) { 
	console.log("**** POKER DEBUG ****\n" + socket.nickname + " played " + data.card + " on hand " + data.hand);
	// TODO:
	// store the played card and which hand









	// send opponent the played card and hand
	users[socket.opponent].emit('receive-opponent-card-played', data);
});


function dealCards(socket) {
	var i = 0;
	var cards = new Array();
	var nextCardIndex = 0;
	var index = -1;

	for(i = 0; i < 5; i ++) {
		// search for a random card that is in the deck
		nextCardIndex = getRandomCard(socket.deck.length, 0);
		console.log("\nNext Card index: " + nextCardIndex + " and it's card: " +  socket.deck[nextCardIndex] +"\n");
		// add card to the payload to client
		cards.push(socket.deck[nextCardIndex]);
		// remove card from the deck
		socket.deck.splice(nextCardIndex, 1);
		//console.log("DECK length: " + socket.deck.length + "\n deck: " + socket.deck);

		if(socket.deck.length < 1) {
			fillDeck(socket);
		}
	}
	
	return cards;
}


// min is inclusive, max is exclusive
function getRandomCard(min, max) {
    var nextCard = (Math.random() * (max - min) + min) >> 0;
    return nextCard;
}

function fillDeck(socket) {
	// set up deck for card game
	socket.deck = new Array();
	var i = 0;
	for(i = 0; i < 52; i ++) {
		socket.deck.push(i + 1);
	}
}










});














// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(8124, "127.0.0.1");
// console.log('Server running at http://127.0.0.1:8124/');