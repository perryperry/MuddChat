import ChatForm from '../ui/ChatForm'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username
	}
}

const mapDispatchToProps = (dispatch) => {	
	return {
		sendMessage: (message) => {
			
		}
	}
}
const Container = connect(mapStateToProps, mapDispatchToProps)(ChatForm)

export default Container