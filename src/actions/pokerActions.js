import C from '../constants'

export const sendCardMove = (payload) => {
	return {
		action: C.PLAY_CARD,
		payload: payload
	}
}