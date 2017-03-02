import ChatForm from '../ui/ChatForm'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username,
		emoji: state.emoji
	}
}

const Container = connect(mapStateToProps)(ChatForm)

export default Container