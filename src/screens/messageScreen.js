import React from 'react'
import { Button, Text, View } from 'react-native'

export default function MessageScreen() {
	const data = new FormData()
	data.append('catalogue', 1)
	data.append('cc', 7)
	data.append('sub', 22)
	data.append('posting', 1)
	data.append('curPos', 0)
	data.append('f_FirstName', 'homer')
	data.append('f_LastName', 'simpson')
	data.append('f_Phone', '2233223')
	data.append('f_Email', 'email')
	data.append('f_BirthDate', '30.02.0001')
	data.append('Password1', 'poroll')
	data.append('Password2', 'poroll')
	data.append('f_Gender', 1)

	const handlePost = async () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'multipart/form-data' },
			body: data,
		}
		await fetch('https://lexta.pro/netcat/add.php', requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.warn(err))
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Message screen</Text>
			<Button onPress={handlePost} title="Post" />
		</View>
	)
}
