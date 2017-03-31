import PokerRequestNotification from '../ui/PokerRequestNotification'
import { connect } from 'react-redux'
import { acceptPokerGame, declinePokerGame } from '../../../actions/pokerActions'


const mapStateToProps = (state) => {
	return {
		isPlayingPoker: state.isPlayingPoker, 
		receivedPokerRequest: state.receivedPokerRequest
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		accept: (payload) => { dispatch(acceptPokerGame(payload)) },
		decline: (payload) => { dispatch(declinePokerGame(payload)) }
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps )(PokerRequestNotification)

export default Container