import C from '../constants'
import {connect, dispatch} from 'react-redux'
import io from 'socket.io-client'
import store from '../index'



const socket = io.connect(`http://localhost:3765`)

socket.on('connect', function() {
	socket.emit('join-poker-room', store.getState().username, function(){});
	console.log("connected?");
}); 

export const updatePlayers = (payload) => {
	return {
		type: C.UPDATE_POKER_PLAYERS,
		payload: payload
    }
} 

socket.on('update-players', function(payload) {
    alert('Received update-players: ' + payload);

    store.dispatch(updatePlayers(payload));
});



export const sendCardMove = (payload) => {
	return {
		type: C.PLAY_CARD,
		payload: payload
	}
}

export const sendGameRequest = (payload) => {
	console.log("inside sendGameRequest");
	socket.emit('join-poker-room', payload, function(data) {
		console.log("it responded");
	});
	return {
		type: C.IS_REQUESTING_POKER,
		payload: true
	}
}

