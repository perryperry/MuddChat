import PokerHand from './PokerHand'
import '../../../stylesheets/Poker.scss'

const PokerTable = ({board={}, hand={}}) => { 
   
    return(
        <div className="poker-table">
        	 <PokerHand />
        </div>
    )
}
export default PokerTable