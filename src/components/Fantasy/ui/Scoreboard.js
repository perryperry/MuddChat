import '../../../stylesheets/Fantasy.scss'
import Matchup from './Matchup'
import MatchupDetailed from './MatchupDetailed'

const Scoreboard = ({scoreboard=[], setScoreBoardWeek}) => {

  const handleOnChange = (e) => {
    setScoreBoardWeek(e.target.value)
  }

  return (

		<div className="scoreboardWrap">
      <select onChange={(e) => handleOnChange(e)} >
        <option value="">Select Week</option>
        <option value="1">Week 1</option>
        <option value="2">Week 2</option>
        <option value="3">Week 3</option>
        <option value="4">Week 4</option>
        <option value="5">Week 5</option>
        <option value="6">Week 6</option>
        <option value="7">Week 7</option>
        <option value="8">Week 8</option>
        <option value="9">Week 9</option>
        <option value="10">Week 10</option>
        <option value="11">Week 11</option>
        <option value="12">Week 12</option>
        <option value="13">Week 13</option>
      </select>
      
       {
          scoreboard.map(function(matchup) {
              return (
                  <Matchup key={matchup.id} matchup={matchup} />
              )
          })
        } 
     
		</div>

   
	)
}

export default Scoreboard