import PokerBoard from './PokerBoard'
import StartGamePrompt from './StartGamePrompt'
import '../../../stylesheets/Poker.scss'

import io from 'socket.io-client'



const PokerTable = ({name="", pokerTable={}, hand=[], isPlayingPoker=false}) => { 
    
    const socket = io.connect(`http://localhost:3765`, {"username": {name} })
    socket.on('update-players', function(payload) {
        alert('Received update-players: ' + payload);
    });

    return(
        <div className="poker-table">

        	{
        		! isPlayingPoker ? 
        		<PokerBoard board={pokerTable.player2} />
        	 	: null
        	}
        	{
        		! isPlayingPoker ? 
        		<PokerBoard board={pokerTable.player1} />
        	 	: <StartGamePrompt />
        	}
        </div>
    )
}
export default PokerTable