// ###################################################
// #########	 Client-side of cards 	#############
// ###################################################

// README: 
// Logic of game is controlled by clients, 
// server only communicates each card played to other client.
// Cards are represented by a number 1 - 52.
// Card images are named 1.png - 52.png

// 
var cardsSocket;

// static immutable values, the rank of each card value
var KING_RANK = 0;
var ACE_RANK = 1;

var MAX_HANDS = 5;
var MAX_SUIT = 3;
var remaining_cards = 52;

// Current number of cards laid on the table this hand
var card_count = 0;
var card_count_opp = 0;

// Current number of hands played 
var hand_count = 0;
var hand_count_opp = 0;

function initCards(socket) {
	$("#cardsButton").attr("src", "/pics/cards/deck.gif");
	// set the socket
	cardsSocket = socket;
	// test cards
	cardsSocket.emit('request-card-game', $('#message').val(), function(data) {
		// error message from server 
		addChatBubble("talk-bubble round talktext admin", data, "leftside");
	});
}

// Convert the int representation of card to rank within suit
function getCardRank(cardInt) {
	return cardInt % 13;
}

function getCardSuitString(cardInt) {
	var suit = getCardSuitInt(cardInt);
	console.log("Suit: " + suit);
	if(suit < 1) {
		return "clubs";
	} else if(suit < 2) {
		return "diamonds";
	} else if(suit < 3) {
		return "hearts";
	} else if(suit < 4) {
		return "spades";
	}
}

function getCardSuitInt(cardInt) {
	return (cardInt / 14) >> 0;
}


function getCardURL(cardInt) {
	var url = '/pics/cards/';
	var rank = getCardRank(cardInt);
	var suitString = getCardSuitString(cardInt);
	url = url + cardInt + '.png';
	console.log("Translated " + cardInt + " to rank: " + rank + " and suit: " + suitString);

	return url;
}

// **************************************************************
// ##################### Socket Events ################
// **************************************************************

$(document).ready(function() {

	$('#cardsButton').on('click',function(){
		initCards(socket);
	});

	// #################################################
	//	Listen for card game events
	// #################################################
	
	socket.on('receive-cards', function(data) {
		//var i = 0;
		//for(i = 0; i < 5; i ++) {
			console.log("Received card: " + data[0]);
			var cardURL = "/pics/cards/" + data[0] + ".png"; //getCardURL(data[i]);
			$('#chat').append('<img src="' + cardURL + '" id="card' + i + '"" />');
			// var id = "#card";
			// id = id + i;
			// $(id).draggable();
		//}
	});

















































});





