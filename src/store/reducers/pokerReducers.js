import C from '../../constants'

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