import { connect } from 'react-redux'
import { sendGameRequest } from '../../../actions/pokerActions'
import StartGamePrompt from '../ui/StartGamePrompt'

const mapStateToProps = (state) => {
	return {
		players: state.pokerPlayers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		requestGame: (payload) => { dispatch(sendGameRequest(payload)) }
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(StartGamePrompt)

export default Container