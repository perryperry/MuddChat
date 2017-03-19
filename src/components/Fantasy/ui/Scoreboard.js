import '../../../stylesheets/Fantasy.scss'
import Matchup from './Matchup'

const Scoreboard = ({scoreboard=[], cssClass=""}) => {
  return (
		<div className="scoreboardWrap {cssClass}">
          {scoreboard.map(function(matchup) {
              return (
                  <Matchup key={matchup.id} matchup={matchup} />
              )
          })}
		</div>
	)
}

export default Scoreboard