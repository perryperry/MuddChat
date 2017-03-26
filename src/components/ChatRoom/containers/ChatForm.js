import ChatForm from '../ui/ChatForm'
import { connect, dispatch } from 'react-redux'
import {showEmojis} from '../../../actions'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username,
		emoji: state.emoji
	}
}
const mapDispatchToProps = (dispatch) => {	
	
	return {
		toggleEmojis: () => {
			dispatch(showEmojis())
		}
	}
}
const Container = connect(mapStateToProps, mapDispatchToProps)(ChatForm)

export default Container