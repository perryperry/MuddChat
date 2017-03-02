import PokerTable from '../ui/PokerTable'
import { connect } from 'react-redux'
import { sendCardMove } from '../../../actions/pokerActions'

const mapStateToProps = (state) => {
	return {
		board: state.poker_board, 
		hand: state.poker_hand
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		playCard: (payload) => { dispatch(sendCardMove(payload)) }
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps )(PokerTable)

export default Container