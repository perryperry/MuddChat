import Scoreboard from '../ui/Scoreboard'
import { connect } from 'react-redux'
import { setScoreboard } from '../../../actions/fantasyActions'

const mapStateToProps = state => ({
	scoreboard: state.scoreboard
})

const Container = connect(mapStateToProps)(Scoreboard)

export default Container