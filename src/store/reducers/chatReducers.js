import C from '../../constants'

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