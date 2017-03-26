import '../../../stylesheets/Poker.scss'

const PokerCard = ({url="/pics/cards/back1.png"}) => { 
   
    return(
    	
        	<img className="poker-card-img" src={url} />
      
    )
}
export default PokerCard