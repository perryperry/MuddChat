// ###################################################
// #########	 Client-side of cards 	#############
// ###################################################

// README: 
// Logic of game is controlled by clients, 
// server only communicates each card played to other client.
// Cards are represented by a number 1 - 52.
// Card images are named 1.png - 52.png.

// Implementation:
// The cards are dealt 5 at a time, 
// user is allowed to have one card selected at a time,
// then the hand columns of the table are focused on to 
// select for card placement
// TODO: Draggable UI instead
// 
var isPlaying = false;
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

var selectedCard = 0;

var hand1 = new Array();
var hand2 = new Array();
var hand3 = new Array();
var hand4 = new Array();
var hand5 = new Array();

var hand1Vs = [];
var hand2Vs = [];
var hand3Vs = [];
var hand4Vs = [];
var hand5Vs = [];

var hand1VsLength = 0;
var hand2VsLength = 0;
var hand3VsLength = 0;
var hand4VsLength = 0;
var hand5VsLength = 0;

function showTable() {
	$('#chatWrap').addClass("makeRoomForCards");
	$('#emojiSelectionWrapper').addClass("makeRoomForCards");
	// Change the cards icon to an active gif
	$("#cardsButton").attr("src", "/pics/cards/deck.gif");
	$('#cardTableWrapper').show();
	$("#cards").show();
}

function hideTable() {
	$('#emojiSelectionWrapper').toggleClass("makeRoomForCards", false);
	$('#chatWrap').toggleClass("makeRoomForCards", false);
	$("#cardsButton").attr("src", "/pics/cards/back1.png");
 	$('#cardTableWrapper').hide();
 	$("#cards").hide();
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

// Converts the integer representation of the card back to the image url
function getCardURL(cardInt) {
	var url = '/pics/cards/';
	var rank = getCardRank(cardInt);
	var suitString = getCardSuitString(cardInt);
	url = url + cardInt + '.png';
	console.log("Translated " + cardInt + " to rank: " + rank + " and suit: " + suitString);

	return url;
}

// Converts the img url of the card to an integer
function getCardInt(cardURL) {
	cardURL = cardURL.replace("/pics/cards/", "");
	cardURL = cardURL.replace(".png", "");
	return parseInt(cardURL, 10);
}

function addCardToHand(cardURL, hand, handObject) {
	
	if(handObject.css('background-image') == 'none') {
		 if(hand.length <= 5) {
			var cardValue = getCardInt(cardURL);
			console.log("Adding " + cardValue + " to " + hand);
			card_count ++;
			hand.push(cardValue);
		 	$("img[src$='" + cardURL + "']").hide();
			if(hand.length < 4) {
				console.log("In here for hand: " + hand.length);
				handObject.css('background-image', 'url(' + cardURL + ')');
			} else {
				console.log("In here for hand: " + hand.length);
				handObject.css('background-image', 'url("/pics/cards/back2.png")');
			}
		}
	 }
	 return hand;
}

function addOpponentCardToHand(cardURL, handLength, handObject) {
	//console.log("Adding " + cardURL + " to " + hand);
	if(handLength <= 5) {
		var cardValue = getCardInt(cardURL);
		card_count_opp ++;
		// hand.push(cardValue);
		// $("img[src$='" + cardURL + "']").hide();
		if(handLength < 4) {
			handObject.css('background-image', 'url(' + cardURL + ')');
		} else {
			handObject.css('background-image', 'url("/pics/cards/back1.png")');
		}
		return true;
	}
	return false;
}

function verifyCardGameComplete(opponentHands) {

	console.log("Attempting to verify that the game is completed:\n");
	console.log("hand1.length: " + hand1.length);
	console.log("hand2.length: " + hand2.length);
	console.log("hand3.length: " + hand3.length);
	console.log("hand4.length: " + hand4.length);
	console.log("hand5.length: " + hand5.length);
	console.log("opponentHands.hand1.length: " + opponentHands.hand1.length);
	console.log("opponentHands.hand2.length: " + opponentHands.hand2.length);
	console.log("opponentHands.hand3.length: " + opponentHands.hand3.length);
	console.log("opponentHands.hand4.length: " + opponentHands.hand4.length);
	console.log("opponentHands.hand5.length: " + opponentHands.hand5.length);
	if(
		hand1.length == 5 &&		
		hand2.length == 5 &&
		hand3.length == 5 &&
		hand4.length == 5 &&
		hand5.length == 5 &&		
		opponentHands.hand1.length == 5 &&
		opponentHands.hand2.length == 5 &&
		opponentHands.hand3.length == 5 &&
		opponentHands.hand4.length == 5 &&
		opponentHands.hand5.length == 5 
	) {
		return true;
	} else {
		return false;
	}
}

function displayAllCards(opponentHands) {
	$("#card4hand1Vs").css({'background-image' : 'url(' + opponentHands.hand1[3] + ')'});
	$("#card5hand1Vs").css({'background-image' : 'url(' + opponentHands.hand1[4] + ')'});
	$("#card4hand2Vs").css({'background-image' : 'url(' + opponentHands.hand2[3] + ')'});
	$("#card5hand2Vs").css({'background-image' : 'url(' + opponentHands.hand2[4] + ')'});
	$("#card4hand3Vs").css({'background-image' : 'url(' + opponentHands.hand3[3] + ')'});
	$("#card5hand3Vs").css({'background-image' : 'url(' + opponentHands.hand3[4] + ')'});
	$("#card4hand4Vs").css({'background-image' : 'url(' + opponentHands.hand4[3] + ')'});
	$("#card5hand4Vs").css({'background-image' : 'url(' + opponentHands.hand4[4] + ')'});
	$("#card4hand5Vs").css({'background-image' : 'url(' + opponentHands.hand5[3] + ')'});
	$("#card5hand5Vs").css({'background-image' : 'url(' + opponentHands.hand5[4] + ')'});

	console.log("Ending game, display these cards? \n\n" + opponentHands.hand1 + 
		"\n" + hand1);

	$("#card4hand1").css('background-image', 'url("/pics/cards/' + hand1[3] + '.png")');
	$("#card5hand1").css('background-image', 'url("/pics/cards/' + hand1[4] + '.png")');
	$("#card4hand2").css('background-image', 'url("/pics/cards/' + hand2[3] + '.png")');
	$("#card5hand2").css('background-image', 'url("/pics/cards/' + hand2[4] + '.png")');
	$("#card4hand3").css('background-image', 'url("/pics/cards/' + hand3[3] + '.png")');
	$("#card5hand3").css('background-image', 'url("/pics/cards/' + hand3[4] + '.png")');
	$("#card4hand4").css('background-image', 'url("/pics/cards/' + hand4[3] + '.png")');
	$("#card5hand4").css('background-image', 'url("/pics/cards/' + hand4[4] + '.png")');
	$("#card4hand5").css('background-image', 'url("/pics/cards/' + hand5[3] + '.png")');
	$("#card5hand5").css('background-image', 'url("/pics/cards/' + hand5[4] + '.png")');
}

// returns true if hand wins
// false if lose
function evaluateHand(hand) {
	console.log("Evaluating hand: " + hand);
	return true;
}

// **************************************************************
// ##################### Socket Events ##########################
// **************************************************************

$(document).ready(function() {
	
	$('#cardsButton').on('click',function() {
		console.log("Quiting game... " + isPlaying);
		// Collapse the chatroom display to make room for card table
		if(! isPlaying ) {
			// request game from server
			socket.emit('request-card-game', $('#message').val(), function(data) {
				// error message from server 
				addChatBubble("talk-bubble round talktext admin", data, "leftside");
			});
		} else {
			console.log("Got into quiting game... " + isPlaying);
			socket.emit('quit-card-game', $('#message').val(), function(data) {
				// error message from server 
				addChatBubble("talk-bubble round talktext admin", data, "leftside");
			});
		}
	});

	// #################################################
	//	Listen for card game events
	// #################################################
	
	// Receive the 5 card deal from the server for next iteration of game play
	socket.on('receive-cards', function(data) {
		isPlaying = true;
		showTable();
		var i = 0;
		var next='';
		var num = (card_count == 20) ? 6 : 5;
		for(i = 0; i < num; i ++) {
			console.log("Received card: " + data[i]);
			var cardURL = "/pics/cards/" + data[i] + ".png"; //getCardURL(data[i]);
			next ='#card' + (i + 1);
			console.log(next);
			$(next).attr('src', cardURL);
			$(next).toggleClass("cardSelected", false); // make sure none of the cards are selected from previous round
			$(next).show();
			//$('#cardsVs').append('<img src="/pics/cards/back1.png" class="card draggable opponent" id="card' + i + '"" draggable="true" ondragstart="drag(event)" />');
		}

	});

	// Receive opponent's card played on the table
	socket.on('receive-opponent-card-played', function(data) {
		console.log("Received " + data.card + " to play on opponent's " + data.hand);
		// addOpponentCardToHand(cardURL, hand, handObject);
		var hand = data.hand;
		var card = data.card;
		if(hand.indexOf("hand1") >= 0) {
			hand1VsLength ++;
			addOpponentCardToHand(card, hand1VsLength, $("#" + hand)); 
		} else if (hand.indexOf("hand2") >= 0) {
			hand2VsLength ++;
			addOpponentCardToHand(card, hand2VsLength, $("#" + hand));
		} else if (hand.indexOf("hand3") >= 0) {
			hand3VsLength ++;
			addOpponentCardToHand(card, hand3VsLength, $("#" + hand));
		} else if (hand.indexOf("hand4") >= 0) {
			hand4VsLength ++;
			addOpponentCardToHand(card, hand4VsLength, $("#" + hand));
		} else if (hand.indexOf("hand5") >= 0) {
			hand5VsLength ++;
			addOpponentCardToHand(card, hand5VsLength, $("#" + hand));
		}
	});

	socket.on('opponent-not-found', function(data){
		alert("Opponent not in the room!");
	});

	socket.on('game-over', function(data) {
		console.log("Server says game over");
		// verify game was complete
		if(verifyCardGameComplete(data)) {
			displayAllCards(data);
			var results = evaluateHand(hand1);
			alert("Game Over: " + results);
		} else {
			console.log("It says the game isn't over...");
			displayAllCards(data);
		}

		hideTable();
		
		$("#cardsButton").attr("src", "/pics/cards/back2.png");
		isPlaying = false;
		remaining_cards = 52;
		// Current number of cards laid on the table this hand
		card_count = 0;
		card_count_opp = 0;
		
		hand1 = [];
		hand2 = [];
		hand3 = [];
		hand4 = [];
		hand5 = [];

		hand1VsLength = 0;
		hand2VsLength = 0;
		hand3VsLength = 0;
		hand4VsLength = 0; 
		hand5VsLength = 0;
	});

	// ################################################
	// Listen for game click events
	// ################################################

	$(".card").on('click', function() {
		var src = $(this).attr("src");
		if(src != selectedCard) {
			selectedCard = src;
			$(this).toggleClass("cardSelected", true);
		} else {
			selectedCard = "";
			$(this).toggleClass("cardSelected", false);
		}
	});

	// placing the card on the hand
	$(".hand").on('click', function() {
		var hand = $(this).attr("id");

		if(selectedCard != "") {
			if(hand.match("hand1$")) {
				addCardToHand(selectedCard, hand1, $(this)); 
				hand = hand + "Vs";
			} else if (hand.match("hand2$")) {
				addCardToHand(selectedCard, hand2, $(this));
				hand = hand + "Vs";
			} else if (hand.match("hand3$")) {
				addCardToHand(selectedCard, hand3, $(this));
				hand = hand + "Vs";
			} else if (hand.match("hand4$")) {
				addCardToHand(selectedCard, hand4, $(this));
				hand = hand + "Vs";
			} else if (hand.match("hand5$")) {
				console.log("In card5");
				addCardToHand(selectedCard, hand5, $(this));
				hand = hand + "Vs";
			}
			// Send the server the move played
			socket.emit('send-card-played', {hand: hand, card: selectedCard}, function(data) {
				// error message from server 
				addChatBubble("talk-bubble round talktext admin", data, "leftside");
			});
			selectedCard = ""; // reset the selectedCard
		}
	});
});