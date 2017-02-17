import ChatRoom from '../ui/ChatRoom'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import {addMessage} from '../../../actions'
let socket = io(`http://localhost:3333`)



const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username,
		socket: socket
	}
}

const mapDispatchToProps = (dispatch) => {	
	return {
		addMsg: (message) => {
			dispatch(addMessage(message))
		}
	}
}

const Container = connect(mapStateToProps,mapDispatchToProps)(ChatRoom)

export default Container