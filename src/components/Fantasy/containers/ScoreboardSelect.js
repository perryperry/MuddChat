import ScoreboardSelect from '../ui/ScoreboardSelect'
import { connect } from 'react-redux'
import { setScoreboard } from '../../../actions/fantasyActions'

const mapStateToProps = state => ({
	
})

const mapDispatchToProps = (dispatch) => {	
	return {
		setScoreBoardWeek: (week) => {
			dispatch(setScoreboard(week))
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ScoreboardSelect)

export default Container