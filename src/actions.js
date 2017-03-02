import C from './constants'

import fetch from 'isomorphic-fetch'

export const tryLogIn = (name) => {
	console.log("Logging in user: " + name);
 	return {
        type: C.LOG_IN,
        payload: true
    }
}

export const logOutUser = () => {
    return {
        type: C.LOG_OUT,
        payload: false
    }
}

export const setUserName = (name) => {
	console.log("Setting user in");
    return {
        type: C.SET_USER_NAME,
        payload: name
    }
}

export const joinChat = () => {
    return {
        type: C.JOIN_CHAT
    }
}

export const clearMessages = () => {
    return {
        type: C.CLEAR_MESSAGES,
        payload: []
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

export const showEmojis = () => 
{
    return {
        type: C.SHOW_EMOJIS
    }
}

export const connectSocket = () => {
    return {
        type:C.CONNECT_SOCKET,
        payload: true
    }
}
