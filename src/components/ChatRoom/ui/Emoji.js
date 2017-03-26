import { PropTypes } from 'react'
import { LocalForm, Control } from 'react-redux-form';
import '../../../stylesheets/LogIn.scss'
import { changeEmoji } from '../../../actions/chatActions'

const pickEmoji = (e) => {
	// console.log(e.target.src);
	changeEmoji(e.target.src)
}

const Emoji = ({emoji="", isToggle=false, click}) => 
{
   return (
   	<div>
   		{
   			(isToggle == true)? 
     		<img src={emoji} className="emoji" onClick={click} /> : 
     		<img src={emoji} className="emoji" onClick={pickEmoji} /> 
   		}
   	</div>
    )
}

export default Emoji