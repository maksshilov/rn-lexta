import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

import * as authActions from '../store/actions/auth'

export default function LaunchScreen() {
	const dispatch = useDispatch()

	const tryLogin = async () => {
		const userData = await AsyncStorage.getItem('userData')

		if (!userData) {
			console.log('LaunchScreen.js > if (!userData)')
			try {
				dispatch(authActions.setDidTryAL())
				return
			} catch (error) {
				Alert.alert('Ошибка', error.message, [{ text: 'Войти заного', onPress: () => authActions.logout() }])
			}
		}

		const userDataJson = JSON.parse(userData)
		const { Email, Token, UserId } = userDataJson
		const expirationDate = new Date(userDataJson.expirationDate)

		if (expirationDate <= new Date()) {
			console.log('LaunchScreen.js > if (expirationDate <= new Date())')
			try {
				await dispatch(authActions.updateTokenAction(Email, Token, UserId, userData))
				return
			} catch (error) {
				Alert.alert('Ошибка', error.message, [{ text: 'Войти заного', onPress: () => authActions.logout() }])
			}
		}

		// AsyncStorage.removeItem('userData')
		console.log('LaunchScreen.js > OK')
		try {
			await dispatch(authActions.updateTokenAction(Email, Token, UserId, userData))
		} catch (error) {
			Alert.alert('Ошибка', error.message, [{ text: 'Войти заного', onPress: () => authActions.logout() }])
		}
	}
	useEffect(() => {
		console.log('useEffect() => tryLogin()')
		tryLogin()
	}, [])

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size="large" color="red" />
			<TouchableOpacity onPress={tryLogin}>
				<Text>try login</Text>
			</TouchableOpacity>
		</View>
	)
}
