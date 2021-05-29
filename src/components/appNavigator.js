import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import StartScreen from '../screens/StartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegistrationScreen from '../screens/RegistrationScreen'

import MainNavigation from '../MainNavigation'
import ProfileScreen from '../screens/ProfileScreen'
import PassChangeScreen from '../screens/PassChangeScreen'
import ObjectScreen from '../screens/ObjectScreen'

const Stack = createStackNavigator()

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
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
					name="PassChange"
					component={PassChangeScreen}
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
