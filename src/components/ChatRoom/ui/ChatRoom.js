import { PropTypes} from 'react'
import { Link } from 'react-router'
import ChatForm from '../containers/ChatForm'
import ChatWindow from '../containers/ChatWindow'
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/ChatRoom.scss'

const ChatRoom = ({loggedIn=false, username="", socket, addMsg}) => { 
	socket.emit('join', {name: 'Billy'});
	
	socket.on('receive-message', function (payload) {
		console.log("Received " + payload); // + " from " + payload.username);
		addMsg(payload);
	});


  	if(loggedIn) {
	    return(
	        <div className="chat-wrapper">
	           <ChatWindow socket={socket} />
	           <ChatForm socket={socket} />
	        </div>
	    )
	} else {
		return <h1>{username}</h1>;
	}
}
ChatRoom.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string
}

export default ChatRoom