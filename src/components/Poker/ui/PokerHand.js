import '../../../stylesheets/Poker.scss'
import PokerCard from './PokerCard'

const PokerHand = ({hand=[]}) => { 
   
    return(
        <div className="poker-hand">
        	<table className="poker-hand-table" >
			   	<tbody>
			   	  {
			   	  	hand.map(function(card, index) {
		              return (
		              	<tr>
		                 <td className="poker-hand-td">
		               		{
		               			(index < 3) ?
		                	  	<PokerCard key={card.id} url={card} /> : 
								<PokerCard key={card.id} url={"/pics/cards/back1.png"} />
		                	}
		                 </td>
		                </tr>
		              )
          			})
			   	  }
			   	</tbody>
			</table>
        </div>
    )
}
export default PokerHand