const updateToken = async (item) => {
	await fetch(`https://lexta.pro/api/UpdateToken.php?user=${item.Email}&token=${item.Token}`, {
		method: 'POST',
		mode: 'no-cors',
		headers: new Headers(),
	})
		.then((res) => res.json())
		.then((data) => console.log('UPDATETOKEN >>>', data.Message))

		.catch((e) => console.log(e))
}

export default updateToken
