import { PropTypes } from 'react'
import { Link } from 'react-router'
import { LocalForm, Control } from 'react-redux-form';
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/ChatRoom.scss'

const ChatForm = ({loggedIn=false, username="", sendMessage, socket}) => { 
	const handleChange = (values) => {}
  	const handleUpdate =(form) => {}
  	const handleSubmit =(username, values) => { 
  		socket.emit('send-msg', values.message);
  		console.log( username +  " sending message: " + values.message)
  		sendMessage(username, values.message);
  		document.getElementsByClassName('chat-input')[0].value = '';
  	}
	    return(
	        <div className="chat-form-wrapper">
	        <LocalForm
		        onUpdate={(form) => handleUpdate(form)}
		        onChange={(values) => handleChange(values)}
		        onSubmit={(values) => handleSubmit(username, values)}
		      	>
		        <Control.text model=".message" className="chat-input" />
		         <button className="chat-submit" >Send</button>
		      </LocalForm>
	        </div>
	    ) 
}
ChatForm.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string
}

export default ChatForm