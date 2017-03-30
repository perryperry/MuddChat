import LogIn from '../ui/LogIn'
import { connect } from 'react-redux'
import { tryLogIn, setUserName} from '../../../actions'
import {joinPoker} from '../../../actions/pokerActions'

const mapStateToProps = state => ({
	loggedIn: state.loggedIn,
	username: state.username
})


const mapDispatchToProps = (dispatch) => {	
	return {
		logIn: (name) => {
			dispatch(tryLogIn(name)),
			dispatch(setUserName(name))
			joinPoker();
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(LogIn)

export default Container
