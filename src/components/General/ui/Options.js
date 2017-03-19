import { PropTypes } from 'react'
import { Link } from 'react-router'
import ScoreboardSelect from '../../Fantasy/containers/ScoreboardSelect'
import ChatIcon from 'react-icons/lib/fa/comment'
import News from 'react-icons/lib/fa/newspaper-o'
import Stats from 'react-icons/lib/fa/bar-chart'
import HomeIcon from 'react-icons/lib/fa/home'
import PodcastIcon from 'react-icons/lib/fa/feed'
import LiveScoringIcon from 'react-icons/lib/fa/balance-scale'
import '../../../stylesheets/Options.scss'

const Options = ({loggedIn=false, logOut, clearChat}) => { 
    return(
        <div className="optionsWrap">
           <table className="options">
	           	<thead>
	           		<tr>
	           			<th></th>
	           			<th>Options</th>
	           		</tr>
	           	</thead>
	           	<tbody>
		           	<tr>
		       			<td >
				           	 <Link to="/" className="option icon">
						     	<HomeIcon />
						     </Link>
			     		</td>
			     		<td>
			     			
			     		</td>
			     	</tr>
	           		<tr>
	           			<td>Scoreboard</td>
	           			<td><ScoreboardSelect /></td>
	           		</tr>
	           		<tr>
	           			<td><div className="pokerIcon icon" /></td>
	           			<td >
	           				<Link to="/poker" activeClassName="selected" className="option">5 Hand Poker</Link>
	           			</td>
	           		</tr>
	           		<tr>
	           			<td><ChatIcon className="icon" /></td>
	           			<td onClick={clearChat}>
	           				<Link to="/chat-room" activeClassName="selected" className="option">Clear Chat</Link>
	           			</td>
	           		</tr>
	           		<tr>
	           			<td><PodcastIcon className="icon"/></td>
	           			<td onClick={clearChat}>
	           				<Link to="/" activeClassName="selected" className="option">Muddcast</Link>
	           			</td>
	           		</tr>
	           		<tr>
	           			<td><LiveScoringIcon className="icon"/></td>
	           			<td>
	           				<Link to="/scoreboard" activeClassName="selected" className="option">Live Scoring</Link>
	           			</td>
	           		</tr>
	           		<tr>
	           			<td><News className="icon"/></td>
	           			<td>
	           				<Link to="/" activeClassName="selected" className="option">League News</Link>
	           			</td>
	           		</tr>
	           		<tr>
	           			<td><Stats className="icon"/></td>
	           			<td>
	           				<Link to="/" activeClassName="selected" className="option">League Stats</Link>
	           			</td>
	           		</tr>
	           		<tr>
	           			<td></td>
	           			<td onClick={logOut}>
	           				<Link to="/" activeClassName="selected" className="option black">Log out</Link>
	           			</td>
	           		</tr>
	           	</tbody>
           </table>
        </div>
    )
}
Options.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string
}

export default Options