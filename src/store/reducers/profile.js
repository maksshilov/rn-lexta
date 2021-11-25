import { SET_PROFILE } from '../actions/profile'

export default (state = {}, action) => {
	switch (action.type) {
		case SET_PROFILE:
			return action.payload
		default:
			return state
	}
}
