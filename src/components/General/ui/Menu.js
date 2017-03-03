import { PropTypes } from 'react'
import { Link } from 'react-router'
import HomeIcon from 'react-icons/lib/fa/home'
import ChatIcon from 'react-icons/lib/fa/comment-o'
import Options from 'react-icons/lib/fa/bars'
import Smile from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/Menu.scss'


const Menu = ({loggedIn=false, showEmojis=false, toggleEmojis}) => {
	
	{if(loggedIn) {
		return (
		    <nav className="menu">

				<img src="/pics/yota.png" /> 
				<Link to="/options" activeClassName="selected">
		    		<Options />
		    	</Link>
		      
		        <Link to="/chat-room" activeClassName="selected" >
		            <ChatIcon />
		        </Link>

		         <Link to="/chat-room" activeClassName="selected">
		         	<Smile onClick={toggleEmojis}/>
				 </Link>

			     <Link to="/" activeClassName="selected">
			     	<HomeIcon />
			     </Link>
		    </nav> 
		)
	} else {
		return (
			<span></span>
		)
	}
}
}

export default Menu