import C from '../constants'
import io from 'socket.io-client'
import dispatch from 'react-redux'
export const socket = io.connect(`http://localhost:3333`)

 socket.on('receive-message', function (payload) {
    console.log("Received " + payload.msg + " from " + payload.username + " and emoji: " + payload.emoji);
	store.dispatch(addMessage(payload)) 
	shiftChatWindow();
  });


export const sendMessage = (emoji, message, username) => {
	console.log("Sending " + message + " from " + username);
	var payload = {
		emoji: emoji,
		msg: message,
		username: username, 
		time: getTime(),
		class:"left"
	}
	socket.emit('send-msg', payload);
	payload.class = "right";
	store.dispatch(addMessage(payload)) 
	shiftChatWindow()
}

export const addMessage = (message) => {
    return {
        type: C.ADD_MESSAGE,
        payload: message
    }
}

export const changeEmoji = (emoji) => {
	console.log("Changing emojis: %s", emoji);
	store.dispatch(test(emoji))
}

export const test = (emoji) => {
	return {
        type: C.CHANGE_EMOJI,
        payload: emoji
    }
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getTime() {
    var d = new Date();
    var h = d.getHours(); 
    var ampm = (h > 11) ? "pm" : "am";
    h = h % 12;
    var m = addZero(d.getMinutes());
    var time = h + ":" + m + " " + ampm;
    return time;
}

// updates the chat window down to the most recent message
function shiftChatWindow() {
	var chatHeight = document.getElementById("chatwindow").scrollHeight;
	document.getElementById("chatwindow").scrollTop = chatHeight;
	console.log("height: " + chatHeight);
}