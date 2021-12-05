import axios from 'axios'

// let user = 'qwe@qwe.qwe',
// pass = 'qwe',

export async function ncAuthFetch(user, pass) {
	let url_1 = 'https://lexta.pro/netcat/modules/auth/',
		url_2 = `${url_1}index.php?AuthPhase=1&REQUESTED_FROM=/&REQUESTED_BY=GET&catalogue=1&sub=6&cc&AUTH_USER=${user}&AUTH_PW=${pass}`
	let secondAuth = new FormData(),
		headers = new Headers({
			// accept: '*',
			// 'content-type': 'multipart/form-data',
			// 'access-control-allow-origin': '*',
			// 'access-control-allow-credentials': true,
			// 'access-control-allow-headers': '*',
		})
	secondAuth.append('AuthPhase', '1')
	secondAuth.append('REQUESTED_FROM', '/')
	secondAuth.append('REQUESTED_BY', 'GET')
	secondAuth.append('catalogue', '1')
	secondAuth.append('sub', '6')
	secondAuth.append('cc', '')
	secondAuth.append('AUTH_USER', user)
	secondAuth.append('AUTH_PW', pass)

	fetch(url_1, {
		// STEP 5. CHANGE URL_1 -> URL_2 - OK!
		method: 'POST',
		// redirect: 'manual', // STEP 2. OFF - OK!
		// headers, // STEP 1. OFF - OK!
		// credentials: 'same-origin',
		// credentials: 'include',
		body: secondAuth, // STEP 5. INCLUDE FORM DATA - OK!
	})
	// .then((res) => res.headers)
	// .then((text) => console.log(text))
	// .catch((err) => console.log(err))
}

export async function ncAuthAxios() {
	axios
		.post(url_2, { withCredentials: true, headers: { 'access-control-allow-origin': '*' } })
		.then((res) => console.log(res.headers))
		.catch((err) => console.log(err))
}

export async function ncAuthAddObj(data) {
	let headers = new Headers({
		// accept: '*',
		'content-type': 'multipart/form-data',
		// 'access-control-allow-origin': '*',
		// 'access-control-allow-credentials': true,
		// 'access-control-allow-headers': 'set-cookie',
	})
	// let data = new FormData()
	// data.append('cc', 6)
	// data.append('sub', 10)
	// data.append('posting', 1)
	// data.append('f_Price', '123000')

	await fetch('https://lexta.pro/netcat/add.php', {
		method: 'post',
		body: data,
		// headers, // STEP 3. OFF - OK
		// credentials: 'include', // STEP 4. OFF - OK!
		// credentials: 'same-origin',
		// credentials: 'omit',
	})
	// .then((res) => {
	// console.log(res.headers)
	// })
	// .then((json) => console.log('json', json))
	// .catch((err) => console.log(err))
}
export async function ncAuthAddObjXML(data) {
	console.log('XMLHttpRequest', data)
	let xhr = new XMLHttpRequest()
	xhr.open('POST', 'https://lexta.pro/netcat/add.php')
	xhr.setRequestHeader('Content-Type', 'multipart/form-data')
	xhr.send(data)
	console.log(xhr.status)
}
