import Options from '../ui/Options'
import { connect } from 'react-redux'
import {logOutUser, clearMessages} from '../../../actions'
import {quitPoker} from '../../../actions/pokerActions'

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearChat : () => {
			dispatch(clearMessages());
		},
		logOut : () => {
			quitPoker();
			dispatch(logOutUser());
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Options)

export default Container