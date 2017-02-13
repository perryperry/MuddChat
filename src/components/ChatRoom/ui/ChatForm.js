import { PropTypes } from 'react'
import { Link } from 'react-router'
import { LocalForm, Control } from 'react-redux-form';
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/ChatRoom.scss'

const ChatForm = ({loggedIn=false, username="", sendMessage}) => { 
	const handleChange = (values) => {console.log(values) }
  	const handleUpdate =(form) => {}
  	const handleSubmit =(username, values) => { 
  		console.log( username +  " sending message: " + values.message)
  		sendMessage(username, values.message);
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