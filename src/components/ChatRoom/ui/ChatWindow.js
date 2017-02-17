import { PropTypes } from 'react'
import { Link } from 'react-router'
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import Message from './Message'
import '../../../stylesheets/ChatRoom.scss'

const ChatWindow = ({messages=[], username="", socket}) => { 
    return(
        <div className="chat-window">
        	 {(messages.length) ?
	            messages.map((message, i) =>
	                
	                    <Message key={i} msg={message} />
	               
	            ) : null
	        }
        </div>
    )
}
ChatWindow.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string
}

export default ChatWindow