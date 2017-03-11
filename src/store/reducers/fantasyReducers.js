import C from '../../constants'

export const scoreboard = (state=[], action) => {
  console.log("Got to here: " + action.payload)
   switch(action.type) {
    case C.SET_SCOREBOARD:
      return action.payload
    default: 
      return state
  }
}