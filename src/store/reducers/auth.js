import { LOGIN, LOGOUT, SET_DID_TRY_AL, UPDATE_TOKEN } from '../actions/auth'

const initialState = {
	token: null,
	userId: null,
	didTryAutoLogin: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				token: action.token,
				userId: action.userId,
				didTryAutoLogin: true,
			}
		case SET_DID_TRY_AL:
			return {
				...state,
				didTryAutoLogin: true,
			}
		case UPDATE_TOKEN:
			return {
				...state,
				token: action.token,
			}
		case LOGOUT: {
			return initialState
		}
		default:
			return state
	}
}
