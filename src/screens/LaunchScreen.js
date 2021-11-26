import React, { useEffect } from 'react'
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

import * as authActions from '../store/actions/auth'

export default function LaunchScreen() {
	const dispatch = useDispatch()
	const tryLogin = async () => {
		const userData = await AsyncStorage.getItem('userData')

		if (!userData) {
			console.log('LaunchScreen.js > if (!userData)')
			dispatch(authActions.setDidTryAL())
			return
		}

		const userDataJson = JSON.parse(userData)
		const { Email, Token, UserId } = userDataJson
		const expirationDate = new Date(userDataJson.expirationDate)

		if (expirationDate <= new Date()) {
			console.log('LaunchScreen.js > if (expirationDate <= new Date())')
			dispatch(authActions.updateTokenAction(Email, Token, UserId, userData))
		}

		console.log('LaunchScreen.js > OK')
		dispatch(authActions.updateTokenAction(Email, Token, UserId, userData))
	}
	useEffect(() => {
		tryLogin()
	})
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size="large" color="red" />
			<TouchableOpacity on onPress={tryLogin}>
				<Text>try login</Text>
			</TouchableOpacity>
		</View>
	)
}
