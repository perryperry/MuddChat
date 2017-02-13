import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	console.log('State:', store.getState().loggedIn)
	result = next(action)

	let {loggedIn, errors} = store.getState()

	console.log(`

		loggedIn: ${loggedIn}
		errors: ${errors.length}

	`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}



