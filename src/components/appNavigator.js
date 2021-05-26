import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainNavigation from '../MainNavigation'
import ProfileScreen from '../screens/ProfileScreen'
import ObjectScreen from '../screens/ObjectScreen'

const Stack = createStackNavigator()

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Main">
				<Stack.Screen
					name="Main"
					component={MainNavigation}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Profile"
					component={ProfileScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Object"
					component={ObjectScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
