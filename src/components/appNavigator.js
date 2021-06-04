import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import StartScreen from '../screens/StartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegistrationScreen from '../screens/RegistrationScreen'

import MainNavigation from '../MainNavigation'
import ProfileScreen from '../screens/ProfileScreen'
import PassChangeScreen from '../screens/PassChangeScreen'
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen'
import ObjectScreen from '../screens/ObjectScreen'

const Stack = createStackNavigator()

export default function AppNavigator({ page }) {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={page}>
				<Stack.Screen
					name="Start"
					component={StartScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Registration"
					component={RegistrationScreen}
					options={{ headerShown: false }}
				/>
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
					name="ProfileDetails"
					component={ProfileDetailsScreen}
					options={{
						headerShown: true,
						title: 'Мои данные',
						headerTitleStyle: { fontFamily: 'gothampro-bold' },
					}}
				/>
				<Stack.Screen
					name="PassChange"
					component={PassChangeScreen}
					options={{
						headerShown: true,
						title: 'Изменение пароля',
						headerTitleStyle: { fontFamily: 'gothampro-bold' },
					}}
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
