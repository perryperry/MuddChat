import Options from '../ui/Options'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn, 
		username: state.username
	}
}

const Container = connect(mapStateToProps)(Options)

export default Container