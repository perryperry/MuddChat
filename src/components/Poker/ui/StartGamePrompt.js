const StartGamePrompt = ({players=[], requestGame}) => { 
   
    return(
        <div className="poker-prompt">
        	<h2>Start Game</h2>
        	<ul>
    		{
    			players.map(function(player, index) {
    				return(
						<li key={player.id}>player</li>
					)
    			})
    		}
    		</ul>
        </div>
    )
}
export default StartGamePrompt