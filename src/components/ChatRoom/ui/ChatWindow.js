import { PropTypes } from 'react'
import { Link } from 'react-router'
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/ChatRoom.scss'

const ChatWindow = ({loggedIn=false, username=""}) => { 
    return(
        <div className="chat-window">
           sfdfs
        </div>
    )
}
ChatWindow.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string
}

export default ChatWindow