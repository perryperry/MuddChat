import ChatRoom from '../ui/ChatRoom'
import { connect } from 'react-redux'
import io from 'socket.io-client'
let socket = io(`http://localhost:3333`)

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username,
		socket: socket
	}
}

const Container = connect(mapStateToProps)(ChatRoom)

export default Container