import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { MainNavigator } from './MainNavigator'
import { AuthNavigator } from './AuthNavigator'
import LaunchScreen from '../screens/LaunchScreen'

export default function AppNavigator() {
	const isAuth = useSelector((state) => state.auth.token)
	const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin)

	return (
		<NavigationContainer>
			{isAuth && <MainNavigator />}
			{!isAuth && didTryAutoLogin && <AuthNavigator />}
			{!isAuth && !didTryAutoLogin && <LaunchScreen />}
		</NavigationContainer>
	)
}
