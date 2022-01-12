export const SET_COORDS = 'SET_COORDS'

export const setCoords = (coords) => {
	return (dispatch) => {
		dispatch({
			type: SET_COORDS,
			coords,
		})
	}
}
