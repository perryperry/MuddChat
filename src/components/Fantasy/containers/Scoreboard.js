import Scoreboard from '../ui/Scoreboard'
import { connect } from 'react-redux'
import { setScoreboard } from '../../../actions/fantasyActions'

const mapStateToProps = state => ({
	scoreboard: state.scoreboard
})


const mapDispatchToProps = (dispatch) => {	
	return {
		setScoreBoardWeek: (week) => {
			dispatch(setScoreboard(week))
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Scoreboard)

export default Container