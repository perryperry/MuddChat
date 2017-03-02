import '../../../stylesheets/Fantasy.scss'

const MatchupDetailed = ({matchup={}}) => {

  return (
  		
		<div className="tableWrap">
	        <table className="matchupTable">
	          <thead>
	            <tr><td></td><td></td></tr>
	          </thead>
	          <tbody>
	          <tr>
	            <td>
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
	            <td>
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

export default MatchupDetailed