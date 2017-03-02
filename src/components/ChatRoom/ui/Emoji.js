import { PropTypes } from 'react'
import { LocalForm, Control } from 'react-redux-form';
import '../../../stylesheets/LogIn.scss'
import { changeEmoji } from '../../../actions/chatActions'

const pickEmoji = (e) => {
	// console.log(e.target.src);
	changeEmoji(e.target.src)
}

const Emoji = ({emoji=""}) => 
{
   return (
     	<img src={emoji} className="emoji" onClick={pickEmoji} />
    )
}

export default Emoji