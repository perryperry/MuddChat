import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { App, Whoops404 } from './components'
import LogIn from './components/containers/LogIn'
import ChatRoom from './components/ChatRoom/containers/ChatRoom'
import Emoji from './components/ChatRoom//ui/Emoji'
import Options from './components/containers/Options'

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LogIn} />
            <Route path="chat-room" component={ChatRoom}/>
            <Route path="log-in" component={LogIn} />
            <Route path="emojis" component={Emoji} />
            <Route path="options" component={Options} />
        	<Route path="*" component={Whoops404}/>
        </Route>  
    </Router>
)

export default routes 