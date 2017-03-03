import C from '../constants'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

export const errors = (state=[], action) => {
  switch(action.type) {
    case C.ADD_ERROR :
    	return [
         ...state,
         action.payload
    	]
    case C.CLEAR_ERROR : 
      return state.filter((message, i) => i !== action.payload)
  	default: 
  		return state
  }
}

export const loggedIn = (state=false, action) => {
  switch(action.type) {
    case C.LOG_IN:
      return action.payload
    case C.LOG_OUT:
      return action.payload
    default:
      return state;
  }
}

export const username = (state="", action) => {
  switch(action.type) {
    case C.SET_USER_NAME:
      return action.payload
    default:
      return state;
  }
}

export const messages = (state=[], action) => {
  switch(action.type) {
    case C.ADD_MESSAGE :
      return [
        ...state,
         action.payload,
      ]
    case C.CLEAR_MESSAGES :
      return []
    default: 
      return state
  }
}

export const joinedChat = (state=false, action) => {
  switch(action.type) {
    case C.JOIN_CHAT:
      return ! state
    default:
      return state;
  }
}

export const emojis = (state=[], action) => {
  switch(action.type) {
    case C.ADD_EMOJI:
      return state
    default: 
      return state
  }
}

export const emoji = (state="", action) => {
  switch(action.type) {
    case C.CHANGE_EMOJI:
      return action.payload
    default: 
      return state
  }
}

export const showEmojis = (state=false, action) => {
  switch(action.type) {
    case C.SHOW_EMOJIS:
      return ! state
    default: 
      return state
  }
}

export const scoreboard = (state=[], action) => {
  console.log("Got to here: " + action.payload)
   switch(action.type) {
    case C.SET_SCOREBOARD:
      return action.payload
    default: 
      return state
  }
}

export const socket = (state={}, action) => {
   switch(action.type) {
    case C.CONNECT_SOCKET:
      return action.payload
    default: 
      return state
  }
}

export default combineReducers({
  errors,
  loggedIn,
  username,
  messages,
  joinedChat,
  emojis,
  emoji,
  showEmojis,
  socket,
  scoreboard,
  form: formReducer
})




