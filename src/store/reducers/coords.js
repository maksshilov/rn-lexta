import { SET_COORDS } from '../actions/coords'

export default (state = '', action) => {
	switch (action.type) {
		case SET_COORDS:
			return action.coords
		default:
			return state
	}
}
