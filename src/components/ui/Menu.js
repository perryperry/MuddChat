import { PropTypes } from 'react'
import { Link } from 'react-router'
import HomeIcon from 'react-icons/lib/fa/home'
import ChatIcon from 'react-icons/lib/fa/comment-o'
import Options from 'react-icons/lib/fa/bars'
import '../../stylesheets/Menu.scss'

const Menu = () => {
	
	return (

	    <nav className="menu">
	    	<img src="/pics/yota.png" />
	        <Link to="/" activeClassName="selected">
	            <HomeIcon />
	        </Link>
	        <Link to="/chat-room" activeClassName="selected">
	            <ChatIcon />
	        </Link>
	        <Link to="/options" activeClassName="selected">
	            <Options />
	        </Link>
	    </nav> 
	)

}

export default Menu