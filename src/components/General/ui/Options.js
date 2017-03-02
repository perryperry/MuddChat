import { PropTypes } from 'react'
import { Link } from 'react-router'
import ChatIcon from 'react-icons/lib/fa/comment'
import News from 'react-icons/lib/fa/newspaper-o'
import Stats from 'react-icons/lib/fa/bar-chart'
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