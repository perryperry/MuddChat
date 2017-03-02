import ChatWindow from '../ui/ChatWindow'
import { connect } from 'react-redux'
import { addMessage } from '../../../actions/chatActions'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username,
		messages: state.messages
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addMsg: (payload) => { dispatch(addMessage(payload)) }
	}
}
const Container = connect(mapStateToProps, mapDispatchToProps )(ChatWindow)

export default Container