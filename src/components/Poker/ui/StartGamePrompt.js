import '../../../stylesheets/Poker.scss'


const StartGamePrompt = ({username="", players=[], requestGame}) => { 
   
   const requestPokerGame = () => {
        var e = document.getElementById("selectPoker");
        console.log("Requesting game against: " + e.options[e.selectedIndex].value);
        requestGame(e.options[e.selectedIndex].value);
   }

    return(
        <div className="poker-prompt">
        	<p className="poker-prompt-header" >5 CARD POKER</p>
            <select id="selectPoker" className="poker-prompt-select" >
                <option value="#" >Select a player to challenge</option>
                 <option value="#" ></option>
                    {
                        players.map((player, i) => 
                            <option key={i} value={player} >{player}</option>
                        )
                    }
            </select>

            <button className="poker-prompt-btn" onClick={requestPokerGame} >Request Game</button>
        </div>
    )
}
export default StartGamePrompt