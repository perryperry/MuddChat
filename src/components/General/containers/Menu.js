import Menu from '../ui/Menu'
import { connect } from 'react-redux'


const mapStateToProps = state => ({
	loggedIn: state.loggedIn,
	showEmojis: state.showEmojis
})

const Container = connect(mapStateToProps)(Menu)

export default Container
