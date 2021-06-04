export default class LextaService {
	_apiBase = 'https://lexta.pro/api/'
	_imgBase = ''

	getToken = async (login, pass) => {
		const data = new FormData()
		data.append('user', login)
		data.append('password', pass)
		return await fetch(`${this._apiBase}GetToken.php`, {
			mode: 'no-cors',
			method: 'POST',
			headers: new Headers(),
			body: data,
		})
	}
	getUserInfo = async (token, login) => {
		return await fetch(`${this._apiBase}GetUserInfo.php?token=${token}&user=${login}`, {
			mode: 'no-cors',
		})
	}
}
