const stateUser = ''
const stateObjects = ''

export const reducerUser = (state = stateUser, action) => {
	if (action.type === 'SET_USER_INFO') {
		return action.payload
	}
	if (action.type === 'UPD_TOKEN') {
		return { ...state, Token: action.payload }
	}
	if (action.type === 'CLEAR') {
		return ''
	}
	return state
}

export const reducerObjects = (state = stateObjects, action) => {
	if (action.type === 'SET_OBJECTS') {
		return action.payload
	}
	if (action.type === 'CLEAR') {
		return ''
	}
	return state
}
