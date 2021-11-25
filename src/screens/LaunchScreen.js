import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

export default function LaunchScreen() {
	const dispatch = useDispatch()
	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem('userData')

			if (!userData) {
				return
			}

			const userDataJson = JSON.parse(userData)
			const { token, userId } = userDataJson.auth
			const { Email } = userDataJson.profile
			const expirationDate = new Date(userDataJson.expirationDate)

			if (expirationDate <= new Date() || !token || !userId) {
				return
			}
		}
	})
	return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}></View>
}
