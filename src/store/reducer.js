export const reducerUser = (state = '', action) => {
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

export const reducerObjects = (state = '', action) => {
	if (action.type === 'SET_OBJECTS') {
		return action.payload
	}
	if (action.type === 'CLEAR') {
		return ''
	}
	return state
}

export const reducerFavObjects = (state = '', action) => {
	if (action.type === 'SET_FAV_OBJECTS') {
		return action.payload
	}
	if (action.type === 'ADD_FAV_OBJECT') {
		return action.payload
	}
	if (action.type === 'DEL_FAV_OBJECT') {
		return action.payload
	}
	return state
}
