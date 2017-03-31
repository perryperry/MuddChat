import { PropTypes } from 'react'
import { Link } from 'react-router'
import Scoreboard from '../../Fantasy/containers/Scoreboard'
import PokerRequestNotification from '../../Poker/containers/PokerRequestNotification'
import ChatIcon from 'react-icons/lib/fa/comment-o'
import Options from 'react-icons/lib/fa/bars'
import Smile from 'react-icons/lib/fa/smile-o'
import '../../../stylesheets/Menu.scss'


const Menu = ({loggedIn=false, showEmojis=false, toggleEmojis}) => {
	
	{if(loggedIn) {
		return (
			<div>
			    <nav className="menu">
			    	
					<img src="/pics/yota.png" className="left" /> 
					
					<Scoreboard />
					
					<Link to="/options" activeClassName="selected">
			    		<Options />
			    	</Link>
			      
			        <Link to="/chat-room" activeClassName="selected" >
			            <ChatIcon />
			        </Link>
			    </nav> 
			 	<PokerRequestNotification />
			</div>
		)
	} else {
		return (
			<span>

			</span>
		)
	}
}
}

export default Menu