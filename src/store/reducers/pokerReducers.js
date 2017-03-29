import C from '../../constants'

export const isRequestingPoker = (state=false, action) => {
	switch(action.type) {
	    case C.IS_REQUESTING_POKER:
	    	return action.payload;
	    case C.IS_NOT_REQUESTING_POKER: 
	      return action.payload;
	  	default: 
	  		return state
  	}
}

export const isPlayingPoker = (state=false, action) => {
	switch(action.type) {
	    case C.IS_PLAYING_POKER:
	    	return true;
	    case C.IS_NOT_PLAYING_POKER: 
	      return false;
	  	default: 
	  		return state
  	}
}

export const pokerHand = (state=[], action) => {
	switch(action.type) {
	    case C.REMOVE_CARD:
	    	return action.payload;
	    case C.SET_NEW_HAND: 
	      return action.payload;
	  	default: 
	  		return state
  	}
}

export const pokerTable = (state={}, action) => {
	switch(action.type) {
	  	default: 
	  		return state
  	}
}

export const pokerPlayers = (state=[], action) => {
	switch(action.type) {
	    case C.UPDATE_POKER_PLAYERS: 
	      return action.payload;
	  	default: 
	  		return state
  	}
}