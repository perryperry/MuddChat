import ChatRoom from '../ui/ChatRoom'
import { connect } from 'react-redux'
import {joinChat, connectSocket} from '../../../actions'

const mapStateToProps = (state) => {

	return {
		loggedIn: state.loggedIn, 
		username: state.username,
		joinedChat: state.joinedChat,
		emojis: state.emojis,
		showEmojis: state.showEmojis
	}
}

const Container = connect(mapStateToProps)(ChatRoom)

export default Container