import Menu from '../ui/Menu'
import { connect } from 'react-redux'
import {showEmojis} from '../../../actions'

const mapStateToProps = state => ({
	loggedIn: state.loggedIn,
	showEmojis: state.showEmojis
})

const mapDispatchToProps = (dispatch) => {	
	
	return {
		toggleEmojis: () => {
			dispatch(showEmojis())
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default Container
