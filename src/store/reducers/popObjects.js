import { SET_POP_OBJECTS } from '../actions/popObjects'

export default (state = [], action) => {
	switch (action.type) {
		case SET_POP_OBJECTS:
			return action.popObjects
		default:
			return state
	}
}
