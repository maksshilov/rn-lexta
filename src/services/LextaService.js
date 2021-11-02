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

	getAllObjects = async (token, user) => {
		return await fetch(`https://lexta.pro/object-api/?token=${token}&user=${user}`, {
			mode: 'no-cors',
		})
	}

	getMyObjects = async (token, user) => {
		return await fetch(`https://lexta.pro/object-api/?profile=1&token=${token}&user=${user}`, {
			mode: 'no-cors',
		})
	}

	getSearchObjects = async (params) => {
		return await fetch(`https://lexta.pro/object-api/?${params}`, { mode: 'no-cors' })
	}

	addObject = async (data) => {
		return await fetch(`https://lexta.pro/netcat/add.php`, {
			method: 'POST',
			mode: 'no-cors',
			headers: new Headers(),
			body: data,
		})
	}

	setLikeUnlike = async (objectId, type, token, email) => {
		let data = new FormData()
		data.append('objectId', objectId)
		data.append('type', type)
		data.append('token', token)
		data.append('user', email)
		return await fetch(`${this._apiBase}LikeObject.php`, {
			mode: 'no-cors',
			method: 'POST',
			headers: new Headers(),
			body: data,
		})
	}

	getMessages = async (token, user, outbox) => {
		return await fetch(
			`https://lexta.pro/api/GetMessages.php?token=${token}&user=${user}&outbox=${outbox}`,
			{ mode: 'no-cors' }
		)
	}

	sendMessage = async (data) => {
		return await fetch(`https://lexta.pro/netcat/add.php`, {
			mode: 'no-cors',
			method: 'POST',
			headers: new Headers(),
			body: data,
		})
	}
}
