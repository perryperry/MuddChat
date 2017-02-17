import C from './constants'
import fetch from 'isomorphic-fetch'

export const tryLogIn = (name) => {
	console.log("Logging in user: " + name);
 	return {
        type: C.LOG_IN,
        payload: true
    }
}

export const setUserName = (name) => {
	console.log("Setting user in");
    return {
        type: C.SET_USER_NAME,
        payload: name
    }
}

export const addMessage = (message) => {
    return {
        type: C.ADD_MESSAGE,
        payload: message
    }
}

export const addError = (message) => 
({
      type: C.ADD_ERROR,
      payload: message
})

export const clearError = index => 
({
        type: C.CLEAR_ERROR,
        payload: index
})   

