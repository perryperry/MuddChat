import axios from 'axios'
import C from '../constants'
import fetch from 'isomorphic-fetch'

export const setScoreboard = (week) => (dispatch) => {
	console.log("Setting scoreboard to week: " + week);
	// var payload = {
	// 	emoji: emoji,
	// 	msg: message,
	// 	username: username, 
	// 	class:"left"
	// }
	// socket.emit('send-msg',payload);
	// payload.class = "right";
	// store.dispatch(addMessage(payload)) 

	//?leagueId=1188261&scoringPeriodId=16



	axios.get('http://localhost:3456/scoreboard/1188261/' + week, {
	    params: {
	      leagueId: 1188261,
	      scoringPeriodId: 16
	    }
	  })
	  .then(function (response) {
	    console.log(response.data);

	    dispatch({
	        type: C.SET_SCOREBOARD,
	        payload: response.data
	    })
	    console.log("hsldjflksdjflksdjf")
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
   return {
        type: C.SET_SCOREBOARD,
        payload: {}
    }
}
