import PokerTable from '../ui/PokerTable'
import { connect } from 'react-redux'
import { sendCardMove } from '../../../actions/pokerActions'

const mapStateToProps = (state) => {
	return {
		pokerTable: state.pokerTable, 
		hand: state.pokerHand,
		isPlayingPoker: state.isPlayingPoker
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		playCard: (payload) => { dispatch(sendCardMove(payload)) }
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps )(PokerTable)

export default Container