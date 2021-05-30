import React from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'

const MessageScreen = ({ state }) => {
	const handleCheck = async () => {
		await fetch(
			`https://lexta.pro/api/GetObjects.php?token=${state.Token}&user=${state.Email}`,
			{
				mode: 'no-cors',
			}
		)
			.then((res) => res.json())
			.then((some) => console.log(some.length))
			.catch((e) => console.log(e))
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Message screen</Text>
			<Text>{state.length}</Text>
			<Button onPress={handleCheck} title="Check" />
		</View>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
export default connect(mapStateToProps)(MessageScreen)
