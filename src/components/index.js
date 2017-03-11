import Menu from './General/containers/Menu'
import ChatWindow from './ChatRoom/containers/ChatWindow'
import ShowErrors from './General/containers/ShowErrors'
import '../stylesheets/index.scss'

export const App = ({children}) =>
	
    <div className="app">
        <Menu />
        {children}
        <ShowErrors />
    </div>

export const Whoops404 = ({ location }) =>
    <div className="whoops-404">
        <h1>Whoops, wrong address</h1>
    </div>