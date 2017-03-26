import C from '../constants'

import io from 'socket.io-client'
import dispatch from 'react-redux'
export const socket = io.connect(`http://localhost:3765`)

export const sendCardMove = (payload) => {
	return {
		action: C.PLAY_CARD,
		payload: payload
	}
}