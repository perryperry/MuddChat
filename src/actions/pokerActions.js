import C from '../constants'

import dispatch from 'react-redux'

export const sendCardMove = (payload) => {
	return {
		action: C.PLAY_CARD,
		payload: payload
	}
}

