

const Matchup = ({scoreboard={}, matchup={}}) => {
	const LEAGUE = {
		YAN 	: { id: 1, name:'yan densmore'},
		LYNCH 	: { id: 2, name: 'Keegan Lynch'},
		PERRY 	: { id: 3, name: 'Matthew Perry'},
		LIPSKER : { id: 4, name: 'Andrew Lipsker'},
		CHAM 	: { id: 5, name: 'david chambless'},
		FORREST : { id: 6, name: 'Forrest Bohlen'},
		SCOTT 	: { id: 7, name: 'Scott McAfee'},
		JOSH 	: { id: 8, name: 'Jasheed Wallace'},
		ULRICH 	: { id: 9, name:'Michael Ulrich'},
		WEST 	: { id: 10, name: 'Matthew West'}
	}


	const handleOnClick = (name) => {
		if(name == LEAGUE.YAN.name) {
   			console.log(name)
   		} else if(name == LEAGUE.LYNCH.name) {
   			console.log(name)
   		} else if(name == LEAGUE.PERRY.name) {
   			console.log(name)
   		} else if(name == LEAGUE.LIPSKER.name) {
   			console.log(name)
   		} else if(name == LEAGUE.CHAM.name) {
   			console.log(name)
   		} else if(name == LEAGUE.FORREST.name) {
   			console.log(name)
   		} else if(name == LEAGUE.SCOTT.name) {
   			console.log(name)
   		} else if(name == LEAGUE.JOSH.name) {
   			console.log(name)
   		} else if(name == LEAGUE.ULRICH.name) {
   			console.log(name)
   		} else if(name == LEAGUE.WEST.name) {
   			console.log(name)
   		} 
  	}
  	
  return (
  		
		<div className="tableWrap" onClick={(e) => handleOnClick(matchup.opponent1.realName)} >
	        <table className="matchupTable">
	          <thead>
	            <tr><td></td><td></td></tr>
	          </thead>
	          <tbody>
	          <tr>
	            <td title={matchup.opponent1.realName}>
	              {matchup.opponent1.name}
	            </td>
	            <td data-rel='score'>
	              {matchup.opponent1.score}
	            </td>
	          </tr>
	          <tr>
	            <td data-rel='record' >
	              {matchup.opponent1.record}
	            </td>
	            <td></td>
	          </tr>
	          <tr>
	            <td title={matchup.opponent2.realName} >
	              {matchup.opponent2.name}
	            </td>
	            <td data-rel='score' >
	              {matchup.opponent2.score}
	            </td>
	          </tr>
	          <tr>
	            <td data-rel='record'>
	              {matchup.opponent2.record}
	            </td>
	             <td></td>
	          </tr>
	        </tbody>
	        </table>
         </div> 
        
	)
}

export default Matchup