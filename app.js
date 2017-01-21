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
			socket.cardCount = 0;
			socket.isPlaying = false;
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

	function updateNicknames() {
		io.sockets.emit('usernames', Object.keys(users));
	}


// #############################################################################################################################
															//	5 hand card game
// ##################################################################################################################################


// NOTE:
// Need to not start over the deck each time.

// Start the card game
socket.on('request-card-game', function(data) {
	
	console.log(socket.nickname + " requesting a poker game against " + data);
	if(users[data]) {
		console.log("Found socket for " + data);
		if(! socket.isPlaying && ! users[data].isPlaying) {
			console.log("Neither player is in a game, starting new game...");
			// init this player
			socket.cardCount = 0;
			socket.isPlaying = true;
			socket.opponent = data;
			socket.host = true; // for keeping track of which deck to use.
			// init the opponent
			users[socket.opponent].host = false;
			users[socket.opponent].cardCount = 0;
			users[socket.opponent].isPlaying = true;
			users[socket.opponent].opponent = socket.nickname;
			fillDeck(socket);
			// start the game
			nextRound(socket);
		}
	} else {
		console.log("Opponent not found");
		users[socket.nickname].emit('opponent-not-found', "Opponent not found");
	}
});
// receive the client's send card to a hand event
socket.on('send-card-played', function(data) { 
	console.log("**** POKER DEBUG ****\n" + socket.nickname + " played " + data.card + " on hand " + data.hand);
	// TODO:
	// store the played card and which hand
	// send opponent the played card and hand
	users[socket.opponent].emit('receive-opponent-card-played', data);
	socket.cardCount ++;
	if(socket.cardCount % 5 == 0 && users[socket.opponent].cardCount == socket.cardCount) {
		if(socket.host) {
			nextRound(socket);
		} else {
			nextRound(users[socket.opponent]);
		}
	}
});


socket.on('quit-card-game', function(data) { 
	console.log("ending game...");
	endGame(socket);
});


function nextRound(socket) {
	//console.log("Deck: "  +  socket.deck.length);

	if(socket.cardCount >= 25) {
		endGame(socket);
	} else {
		var cards = dealCards(socket);
		var cardsVs = dealCards(socket);
		if(socket.opponent) {
			users[socket.opponent].emit('receive-cards', cardsVs);
		}
		users[socket.nickname].emit('receive-cards', cards);
	}
}

function dealCards(socket) {
	var i = 0;
	var cards = new Array();
	var index = -1;
	for(i = 0; i < 5; i ++) {
		drawCard(socket, cards);
		console.log("DECK length: " + socket.deck.length + "\n deck: " + socket.deck);
	}
	if(socket.deck.length <= 2) {
		drawCard(socket, cards);
	}
	return cards;
}

function drawCard(socket, cards) {
	var nextCardIndex = 0;
	// search for a random card that is in the deck
	nextCardIndex = getRandomCard(socket.deck.length, 0);
	console.log("\nNext Card index: " + nextCardIndex + " and it's card: " +  socket.deck[nextCardIndex] +"\n");
	// add card to the payload to client
	cards.push(socket.deck[nextCardIndex]);
	// remove card from the deck
	socket.deck.splice(nextCardIndex, 1);
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

// Reset both players for next future game
function endGame(socket) {
	if(socket.opponent) {
		users[socket.opponent].emit('game-over', "game over");
		fillDeck(users[socket.opponent]);
		users[socket.opponent].cardCount = 0;
		users[socket.opponent].isPlaying = false;
		users[socket.opponent].opponent = "";
	}
	users[socket.nickname].emit('game-over', "game over");
	fillDeck(socket);
	socket.cardCount = 0;
	socket.isPlaying = false;
	socket.opponent = "";
}

});