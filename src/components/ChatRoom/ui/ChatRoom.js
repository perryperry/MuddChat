import { PropTypes} from 'react'
import { Link } from 'react-router'
import ChatForm from '../containers/ChatForm'
import ChatWindow from '../containers/ChatWindow'
import Emojis from './Emojis'
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/ChatRoom.scss'


const ChatRoom = ({loggedIn=false, joinedChat=false, username="", emojis,showEmojis=false}) => { 

  	if(loggedIn) {
	    return(
	        <div className="chat-wrapper" >
	        <ChatWindow />
	           <ChatForm />
	        {(showEmojis)?
	           <Emojis emojis={emojis} /> : null
	        }
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