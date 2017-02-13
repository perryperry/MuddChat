import { PropTypes } from 'react'
import { Link } from 'react-router'
import EmojiIcon from 'react-icons/lib/fa/smile-o'
import '../../stylesheets/ChatRoom.scss'

const Options = ({loggedIn=false, username=""}) => { 
    return(
        <div className="options-window">
           <table>
	           	<thead>
	           		<tr>
	           			<th>Options</th>
	           		</tr>
	           	</thead>
	           	<tbody>
	           		<tr>
	           			<td>Log out</td>
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