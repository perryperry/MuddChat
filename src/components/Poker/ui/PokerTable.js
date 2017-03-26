import PokerBoard from './PokerBoard'
import StartGamePrompt from './StartGamePrompt'
import '../../../stylesheets/Poker.scss'

const PokerTable = ({pokerTable={}, hand=[], isPlayingPoker=false}) => { 
   
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