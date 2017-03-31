import C from '../constants'
import {connect, dispatch} from 'react-redux'
import io from 'socket.io-client'
import store from '../index'

const socket = io.connect(`http://localhost:3765`)

socket.on('connect', function() {
	if(store.getState().loggedIn) {
		joinPoker();
	}
}); 

socket.on('update-players', function(payload) {
    store.dispatch(updatePlayers(payload));
});

socket.on('receive-card-game-request', function(payload) {
	console.log("Game request received from: " + payload);
	store.dispatch(displayReceivedPokerRequest(payload));
});

export const joinPoker = () => {
	socket.emit('join-poker-room', store.getState().username, function() {
		console.log("connected to poker room");
	});
}

export const quitPoker = () => {
	socket.emit('quit', store.getState().username);
}

export const updatePlayers = (payload) => {
	return {
		type: C.UPDATE_POKER_PLAYERS,
		payload: payload
    }
} 

export const sendCardMove = (payload) => {
	return {
		type: C.PLAY_CARD,
		payload: payload
	}
}

export const sendGameRequest = (payload) => {
	console.log("inside sendGameRequest");
	socket.emit('request-card-game', payload, function(data) {
		console.log("it responded");
	});
	return {
		type: C.IS_REQUESTING_POKER,
		payload: true
	}
}

export const displayReceivedPokerRequest = (payload) => {
	return {
		type: C.RECEIVED_POKER_REQUEST,
		payload: {
			from: payload,
			isRequesting: true
		}
	}
}

export const acceptPokerGame = (payload) => {
	console.log("ACTION: acceptPokerGame from " + payload.from);

	socket.emit('accept-game-request', payload.from, function() {
		console.log("acceptance received by " + payload.from);



	});

	return {
		type: C.ACCEPT_POKER_GAME,
		payload: {
			from: payload,
			isRequesting: false
		}
	}
}

export const declinePokerGame = (payload) => {
	console.log("ACTION: declinePokerGame from " + payload.from);

	socket.emit('decline-game-request', payload.from, function() {
		console.log("declination received by " + payload.from);
	});

	return {
		type: C.DECLINE_POKER_GAME,
		payload: {
			from: payload,
			isRequesting: false
		}
	}
}

