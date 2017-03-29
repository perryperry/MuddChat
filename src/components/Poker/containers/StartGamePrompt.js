import { connect } from 'react-redux'
import { sendGameRequest } from '../../../actions/pokerActions'
import StartGamePrompt from '../ui/StartGamePrompt'

const mapStateToProps = (state) => {
	return {
		username: state.username,
		players: state.pokerPlayers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		requestGame: (payload) => { 
			console.log("requesting poker game" + payload);
			dispatch(sendGameRequest(payload)) 
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(StartGamePrompt)

export default Container