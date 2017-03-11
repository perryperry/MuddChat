import '../../../stylesheets/Fantasy.scss'
import Matchup from './Matchup'

const Scoreboard = ({scoreboard=[]}) => {
  return (
		<div className="scoreboardWrap">
          {scoreboard.map(function(matchup) {
              return (
                  <Matchup key={matchup.id} matchup={matchup} />
              )
          })}
		</div>
	)
}

export default Scoreboard