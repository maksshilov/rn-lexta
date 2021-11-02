import React from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import LextaService from '../services/LextaService'
import store from '../store'
import md5 from 'md5'

const MessageScreen = ({ state }) => {
	const handleGetMessages = async () => {
		const lexta = new LextaService()
		lexta
			.getMessages(
				store.getState().reducerUser.Token,
				md5(store.getState().reducerUser.Email),
				0
			)
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err))
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Message screen</Text>
			<Button onPress={handleGetMessages} title="Check" />
		</View>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
export default connect(mapStateToProps)(MessageScreen)
