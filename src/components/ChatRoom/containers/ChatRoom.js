import ChatRoom from '../ui/ChatRoom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username
	}
}

const Container = connect(mapStateToProps)(ChatRoom)

export default Container