import Matchup from '../ui/Matchup'
import { connect } from 'react-redux'
import { setScoreboard } from '../../../actions/fantasyActions'

const mapStateToProps = state => ({
	scoreboard: state.scoreboard
})

const Container = connect(mapStateToProps)(Matchup)

export default Container