import { SET_AUTH_FOR_AUTH_COOKIES } from '../actions/authCookies'

export default (state = {}, action) => {
	switch (action.type) {
		case SET_AUTH_FOR_AUTH_COOKIES:
			return action.authCookiesLogin
		default:
			return state
	}
}
