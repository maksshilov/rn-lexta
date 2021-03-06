export default class LextaService {
	_apiBase = 'https://lexta.pro/api/'
	_objectBase = 'https://lexta.pro/object-api/?'
	_netcatBase = 'https://lexta.pro/netcat/'
	_imgBase = ''

	checkLogin = async (email) => {
		return await fetch(`${this._apiBase}CheckLogin.php?user=${email}`, { mode: 'no-cors' })
	}

	signup = async (signupInputs) => {
		const { firstName, lastName, phone, email, birthDate, pass, rpass, gender } = signupInputs
		const signupData = new FormData()
		signupData.append('catalogue', 1)
		signupData.append('cc', 7)
		signupData.append('sub', 22)
		signupData.append('posting', 1)
		signupData.append('curPos', 0)
		signupData.append('f_FirstName', firstName)
		signupData.append('f_LastName', lastName)
		signupData.append('f_Phone', phone)
		signupData.append('f_Email', email)
		signupData.append('f_BirthDate', birthDate)
		signupData.append('f_Gender', gender)
		signupData.append('Password1', pass)
		signupData.append('Password2', rpass)

		return await fetch(`${this._netcatBase}add.php`, {
			method: 'POST',
			// mode: 'no-cors',
			headers: new Headers(),
			body: signupData,
		})
	}

	getToken = async (user, pass) => {
		const tokenData = new FormData()
		tokenData.append('user', user)
		tokenData.append('password', pass)
		return await fetch(`${this._apiBase}GetToken.php`, {
			// mode: 'no-cors',
			method: 'POST',
			headers: new Headers(),
			body: tokenData,
		})
	}

	updateToken = async (email, token, userid) => {
		const data = new FormData()
		data.append('user', email)
		data.append('token', token)
		data.append('userId', userid) // convert into md5

		return await fetch(`${this._apiBase}UpdateToken.php`, {
			method: 'POST',
			// mode: 'no-cors',
			headers: new Headers(),
			body: data,
		})
	}

	getUserInfo = async (token, email) => {
		return await fetch(`${this._apiBase}GetUserInfo.php?token=${token}&user=${email}`, {
			// mode: 'no-cors',
		})
	}

	uploadUserPic = async (data) => {
		return await fetch(`${this._apiBase}LoadingProfileImage.php`, {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				Accept: 'application/json',
				'content-type': 'multipart/form-data',
			},
			body: data,
			redirect: 'follow',
		})
	}

	getAllObjects = async (token, email) => {
		return await fetch(`${this._objectBase}token=${token}&user=${email}`, {
			// mode: 'no-cors',
		})
	}

	getMyObjects = async (token, email) => {
		return await fetch(`${this._objectBase}profile=1&token=${token}&user=${email}`, {
			// md5 for email
			// mode: 'no-cors',
		})
	}

	getSearchObjects = async (params) => {
		return await fetch(`${this._objectBase}${params}`)
	}

	addObject = async (data) => {
		return await fetch(`${this._netcatBase}add.php`, {
			method: 'POST',
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
			// mode: 'no-cors',
			method: 'POST',
			headers: new Headers(),
			body: data,
		})
	}

	getMessages = async (email, token, outbox = '') => {
		return await fetch(`https://lexta.pro/api/GetMessages.php?user=${email}&token=${token}&outbox=${outbox}`, { method: 'GET' })
	}

	getNews = async (recNum = '', curPos = '') => {
		return await fetch(`https://lexta.pro/api/GetNews.php?recNum=${recNum}&curPos=${curPos}`, { method: 'GET' })
	}

	sendMessage = async (data) => {
		return await fetch(`${this._netcatBase}add.php`, {
			method: 'POST',
			headers: { 'Content-Type': 'multipart/form-data' },
			body: data,
		})
	}

	setSubscribePrice = async (email_MD5, token, objectId, type) => {
		let data = new FormData()
		data.append('objectId', objectId)
		data.append('type', type)
		data.append('user', email_MD5)
		data.append('token', token)

		return await fetch(`https://lexta.pro/api/SubscribePriceObject.php`, {
			method: 'POST',
			body: data,
		})
	}

	getSubscribePrice = async (token, email_MD5) => {
		return await fetch(`https://lexta.pro/object-api/?subscribePrice=1&token=${token}&user=${email_MD5}`)
	}

	autoSearch = async (queryString) => {
		return await fetch(`https://lexta.pro/api/AutoSearch.php?queryString=${queryString}`, { method: 'GET' })
	}

	loginHandler = async () => {
		let loginFormat = login.toLowerCase().replace(' ', '')
		lexta
			.getToken(loginFormat, md5(pass))
			.then((res) => {
				setLoading(true)
				return res.json()
			})
			.then((token) => {
				if (token['Status']) {
					lexta
						.getUserInfo(token['Token'], loginFormat)
						.then((res) => {
							return res.json()
						})
						.then((data) => {
							const storage = JSON.stringify({
								...data[0],
								Token: token['Token'],
								UserId: token['UserId'],
							})
							writeItemToStorage(storage)

							return data
						})
						.then((data) => {
							setUserInfo({ ...data[0], Token: token['Token'] })
						})
						.then(() => {
							setLoading(false)
							navigation.navigate('Main')
						})
						.catch((e) => console.log(e))
				} else {
					setLoading(false)
					Alert.alert('????????????', '???? ?????????? ???????????????? ?????????? ??/?????? ????????????.')
				}
			})

			.catch((e) => {
				console.log(e)
			})
	}
}
