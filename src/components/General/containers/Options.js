import Options from '../ui/Options'
import { connect } from 'react-redux'
import {logOutUser, clearMessages} from '../../../actions'

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
			dispatch(logOutUser());
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Options)

export default Container