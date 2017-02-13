import ChatWindow from '../ui/ChatWindow'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username
	}
}

const Container = connect(mapStateToProps)(ChatWindow)

export default Container