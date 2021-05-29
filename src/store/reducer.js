const initialState = ''

export const reducer = (state = initialState, action) => {
	if (action.type === 'SET_TOKEN') {
		return action.payload
	}
	return state
}
