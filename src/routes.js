import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { App, Whoops404 } from './components'
import Scoreboard from './components/Fantasy/containers/Scoreboard'
import LogIn from './components/General/containers/LogIn'
import ChatRoom from './components/ChatRoom/containers/ChatRoom'
import Emoji from './components/ChatRoom//ui/Emoji'
import Options from './components/General/containers/Options'
import PokerTable from './components/Poker/containers/PokerTable'

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LogIn} />
            <Route path="chat-room" component={ChatRoom}/>
            <Route path="log-in" component={LogIn} />
            <Route path="emojis" component={Emoji} />
            <Route path="options" component={Options} />
            <Route path="scoreboard" component={Scoreboard} />
            <Route path="poker" component={PokerTable} /> 
        	<Route path="*" component={Whoops404}/>
        </Route>  
    </Router>
)

export default routes 