import React from 'react'
import { Button, Text, View } from 'react-native'

export default function MessageScreen() {
	const myHeaders = new Headers()

	const data = new FormData()
	data.append('catalogue', 1)
	data.append('cc', 7)
	data.append('sub', 22)
	data.append('posting', 1)
	data.append('curPos', 0)
	data.append('f_FirstName', 'bart')
	data.append('f_LastName', 'simpsons')
	data.append('f_Phone', '1111111111')
	data.append('f_Email', 'test_react2@test.test')
	data.append('f_BirthDate', '01.01.2000')
	data.append('Password1', 'poroll')
	data.append('Password2', 'poroll')
	data.append('f_Gender', 1)

	const handleCheck = async () => {
		await fetch(`https://lexta.pro/api/CheckLogin.php?user=test_react2@test.test`, {
			mode: 'no-cors',
		})
			.then((res) => console.log(res))
			// .then((json) => console.log(json))
			.catch((e) => console.log(e))
	}

	const handlePost = async () => {
		await fetch('https://lexta.pro/netcat/add.php', {
			method: 'POST',
			mode: 'no-cors',
			headers: myHeaders,
			body: data,
		})
			.then((response) => response.text())
			.then((data) => console.log(data))
			.catch((err) => console.log(err))
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Message screen</Text>
			<Button onPress={handlePost} title="Post" />
			<Button onPress={handleCheck} title="Check" />
		</View>
	)
}
