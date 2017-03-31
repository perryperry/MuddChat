import PokerBoard from './PokerBoard'
import StartGamePrompt from '../containers/StartGamePrompt'
import '../../../stylesheets/Poker.scss'

const PokerRequestNotification = ({isPlayingPoker=false, receivedPokerRequest={"from":"", "isRequesting": false}, accept, decline}) => { 
    
    const acceptRequest = () => {
        console.log("Poker game accept");
        accept(receivedPokerRequest);
    }

     const declineRequest = () => {
        console.log("Poker game decline");
        decline(receivedPokerRequest);
    }

   {
        if(receivedPokerRequest.isRequesting) {
             return(
            <div className="poker-request-notification">
                
                <div className="pokerRequestIcon" />

                Poker Request from {receivedPokerRequest.from} <br/> 
                <button onClick={acceptRequest} className="pokerRequestBtn" >accept</button>
                <button onClick={declineRequest} className="pokerRequestBtn" >decline</button>
            </div>
            )
        } else {
            return(
             <div></div>
          )
        }
    }
}

export default PokerRequestNotification