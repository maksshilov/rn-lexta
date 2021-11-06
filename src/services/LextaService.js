export default class LextaService {
	_apiBase = 'https://lexta.pro/api/'
	_objectBase = 'https://lexta.pro/object-api/?'
	_netcatBase = 'https://lexta.pro/netcat/'
	_imgBase = ''

	getToken = async (user, pass) => {
		const data = new FormData()
		data.append('user', user)
		data.append('password', pass)
		return await fetch(`${this._apiBase}GetToken.php`, {
			mode: 'no-cors',
			method: 'POST',
			headers: new Headers(),
			body: data,
		})
	}

	getUserInfo = async (token, user) => {
		return await fetch(`${this._apiBase}GetUserInfo.php?token=${token}&user=${user}`, {
			mode: 'no-cors',
		})
	}

	uploadUserPic = async (data) => {
		return await fetch(`${this._apiBase}LoadingProfileImage.php`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				Accept: 'application/json',
				'content-type': 'multipart/form-data',
			},
			body: data,
			redirect: 'follow',
		})
	}

	getAllObjects = async (token, user) => {
		return await fetch(`${this._objectBase}token=${token}&user=${user}`, {
			mode: 'no-cors',
		})
	}

	getMyObjects = async (token, user) => {
		return await fetch(`${this._objectBase}profile=1&token=${token}&user=${user}`, {
			mode: 'no-cors',
		})
	}

	getSearchObjects = async (params) => {
		return await fetch(`${this._objectBase}${params}`, { mode: 'no-cors' })
	}

	addObject = async (data) => {
		return await fetch(`${this._netcatBase}add.php`, {
			method: 'POST',
			mode: 'no-cors',
			headers: new Headers(),
			body: data,
		})
	}

	setLikeUnlike = async (objectId, type, token, user) => {
		let data = new FormData()
		data.append('objectId', objectId)
		data.append('type', type)
		data.append('token', token)
		data.append('user', user)
		return await fetch(`${this._apiBase}LikeObject.php`, {
			mode: 'no-cors',
			method: 'POST',
			headers: new Headers(),
			body: data,
		})
	}

	getMessages = async (token, user, outbox) => {
		return await fetch(
			`${this._apiBase}GetMessages.php?token=${token}&user=${user}&outbox=${outbox}`,
			{ mode: 'no-cors' }
		)
	}

	sendMessage = async (data) => {
		return await fetch(`${this._netcatBase}add.php`, {
			mode: 'no-cors',
			method: 'POST',
			headers: { 'Content-Type': 'multipart/form-data' },
			body: data,
		})
	}
}
