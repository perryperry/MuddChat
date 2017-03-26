import PokerHand from './PokerHand'
import '../../../stylesheets/Poker.scss'

// The played cards 

const PokerBoard = ({board={}}) => { 
    return(
	    <div className="board-wrap">
	    	<PokerHand hand={board.hand1} />
			<PokerHand hand={board.hand2} />
			<PokerHand hand={board.hand3} />
			<PokerHand hand={board.hand4} />
			<PokerHand hand={board.hand5} />
		</div> 
    )
}
export default PokerBoard;