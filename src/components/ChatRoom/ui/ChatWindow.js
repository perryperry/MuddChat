import { PropTypes } from 'react'
import { Link } from 'react-router'
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import Message from './Message'
import '../../../stylesheets/ChatRoom.scss'

import {socket} from '../../../actions/chatActions'

const ChatWindow = ({messages=[], username="", addMsg}) => { 
   
    return(
        <div className="chat-window">
        	 {(messages.length) ?
	            messages.map((message, i) => 

	               <div key={i} className="messageWrap" >
                        <div className={message.class}>
                            <img className="emoji" src={message.emoji} />
                            <span className="messageSpan">{message.msg}</span>
                            <span className="username">{message.username}</span>
                        </div>
                        
                    </div>
	               
	            ) : null
	        }
        </div>
    )
}
ChatWindow.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
    chatJoined: PropTypes.bool
}

export default ChatWindow