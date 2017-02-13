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



export default combineReducers({
  errors,
  loggedIn,
  username,
  form: formReducer
})




