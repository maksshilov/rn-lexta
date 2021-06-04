const updateToken = async ({ Email, Token, UserId }) => {
	const data = new FormData()
	data.append('user', Email)
	data.append('token', Token)
	data.append('userId', UserId)

	await fetch(`https://lexta.pro/api/UpdateToken.php`, {
		method: 'POST',
		mode: 'no-cors',
		headers: new Headers(),
		body: data,
	})
		.then((res) => res.json())
		.then((data) => console.log('UPDATETOKEN >>>', data.Message))

		.catch((e) => console.log(e))
}

export default updateToken
