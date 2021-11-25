import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { MainNavigator } from './MainNavigator'
import { AuthNavigator } from './AuthNavigator'

export default function AppNavigator() {
	const isAuth = useSelector((state) => state.auth.token)
	return (
		<NavigationContainer>
			{!isAuth && <AuthNavigator />}
			{isAuth && <MainNavigator />}
			{/* <AppStack.Navigator> */}
			{/* <AppStack.Screen name="Object" component={ObjectScreen} options={{ headerShown: false }} /> */}
			{/* <AppStack.Screen name="SearchResult" component={SearchScreenResult} options={{ headerShown: false }} /> */}
			{/* </AppStack.Navigator> */}
		</NavigationContainer>
	)
}
