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

// current card focused on
var cur_card = 0;
var cur_column = 0;

var selectedCard = 0;

var hand1 = [];
var hand2 = [];
var hand3 = [];
var hand4 = [];
var hand5 = [];


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

function addCardToHand(cardURL, hand) {
	console.log("Adding " + cardURL + " to " + hand);
	if(hand.length < 5) {
		var cardValue = getCardInt(cardURL);
		card_count ++;
		hand.push(cardValue);
		$("img[src$='" + cardURL + "']").hide();
		return true;
	}
	return false;
}


// **************************************************************
// ##################### Socket Events ##########################
// **************************************************************

$(document).ready(function() {
	
	$('#cardsButton').on('click',function(){
		// Collapse the chatroom display to make room for card table
		if(! isPlaying ) {
			isPlaying = true;
			//$('#chatWrap').addClass("makeRoomForCards");
			//$('#emojiSelectionWrapper').addClass("makeRoomForCards");
			// Change the cards icon to an active gif
			$("#cardsButton").attr("src", "/pics/cards/deck.gif");
			$('#cardTableWrapper').show();
			// request game from server
			socket.emit('request-card-game', $('#message').val(), function(data) {
				// error message from server 
				addChatBubble("talk-bubble round talktext admin", data, "leftside");
			});
		} else { // was playing card game
			// notify server that you are quiting
			socket.emit('quit-card-game', $('#message').val(), function(data) {
				// error message from server 
				addChatBubble("talk-bubble round talktext admin", data, "leftside");
			});
			//$('#emojiSelectionWrapper').toggleClass("makeRoomForCards", false);
			//$("#cardsButton").attr("src", "/pics/cards/back1.png");
		 	$('#cardTableWrapper').hide();
		 	isPlaying = false;
		 }
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

	$(".hand").on('click', function() {
		var hand = $(this).attr("id");
		if(selectedCard != "") {
			if(hand == "hand1") {
				if(addCardToHand(selectedCard, hand1)) {
					if(hand1.length < 4) {
						$(this).append("<img class='playedCard cardPlayed" + hand1.length + "' src='" + selectedCard + "' />");
					} else {
						$(this).append("<img class='playedCard cardPlayed" + hand1.length + "' src='/pics/cards/back2.png' />");
					}
					console.log("After adding card to hand1: " + hand1);
				}
			} else if (hand == "hand2") {
				if(addCardToHand(selectedCard, hand2)) {
					if(hand2.length < 4) {
						$(this).append("<img class='playedCard cardPlayed" + hand2.length + "' src='" + selectedCard + "' />");
					} else {
						$(this).append("<img class='playedCard cardPlayed" + hand2.length + "' src='/pics/cards/back2.png' />");
					}
					console.log("After adding card to hand2: " + hand2);
				}
			} else if (hand == "hand3") {
				if(addCardToHand(selectedCard, hand3)) {
					if(hand3.length < 4) {
						$(this).append("<img class='playedCard cardPlayed" + hand3.length + "' src='" + selectedCard + "' />");
					} else {
						$(this).append("<img class='playedCard cardPlayed" + hand3.length + "' src='/pics/cards/back2.png' />");
					}
					console.log("After adding card to hand3: " + hand3);
				}
			} else if (hand == "hand4") {
				if(addCardToHand(selectedCard, hand4)) {
					if(hand4.length < 4) {
						$(this).append("<img class='playedCard cardPlayed" + hand4.length + "' src='" + selectedCard + "' />");
					} else {
						$(this).append("<img class='playedCard cardPlayed" + hand4.length + "' src='/pics/cards/back2.png' />");
					}
					console.log("After adding card to hand4: " + hand4);
				}
			} else if (hand == "hand5") {
				if(addCardToHand(selectedCard, hand5)) {
					if(hand5.length < 4) {
						$(this).append("<img class='playedCard cardPlayed" + hand5.length + "' src='" + selectedCard + "' />");
					} else {
						$(this).append("<img class='playedCard cardPlayed" + hand5.length + "' src='/pics/cards/back2.png' />");
					}
					console.log("After adding card to hand5: " + hand5);
				}
			}
			selectedCard = "";
		}
	});

	// #################################################
	//	Listen for card game events
	// #################################################
	
	socket.on('receive-cards', function(data) {
		var i = 0;
		var next='';
		for(i = 0; i < 5; i ++) {
			console.log("Received card: " + data[i]);
			var cardURL = "/pics/cards/" + data[i] + ".png"; //getCardURL(data[i]);
			next ='#card' + (i + 1);
			console.log(next);
			$(next).attr('src', cardURL);
			$(next).show();
			//$('#cardsVs').append('<img src="/pics/cards/back1.png" class="card draggable opponent" id="card' + i + '"" draggable="true" ondragstart="drag(event)" />');
		}
	});
});





