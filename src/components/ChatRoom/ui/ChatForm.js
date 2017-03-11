import { PropTypes } from 'react'
import { Link } from 'react-router'
import { LocalForm, Control } from 'react-redux-form';
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/ChatRoom.scss'
import {sendMessage} from '../../../actions/chatActions'
import Emoji from './Emoji'

const ChatForm = ({loggedIn=false, username="", emoji="/pics/emojis/emoji37.png"}) => { 
	const handleChange = (values) => {}
  	const handleUpdate =(form) => {}
  	const handleSubmit =(username, values) => { 
  		console.log( username +  " sending message: " + values.message)
  		sendMessage(emoji, values.message, username);
  		document.getElementsByClassName('chat-input')[0].value = '';
  	}
  	
    return(
        <div className="chat-form-wrapper">
        
        <LocalForm
	        onUpdate={(form) => handleUpdate(form)}
	        onChange={(values) => handleChange(values)}
	        onSubmit={(values) => handleSubmit(username, values)}>
          <Emoji emoji={emoji} className="float-left" />
	        <Control.text model=".message" className="chat-input" />
	         <button className="chat-submit" >Send</button>
	      </LocalForm>
        </div>
    ) 
}
ChatForm.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
    emoji: PropTypes.string
}

export default ChatForm