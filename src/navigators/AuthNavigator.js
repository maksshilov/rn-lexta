import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StartScreen from '../screens/StartScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const AuthStack = createStackNavigator()
export const AuthNavigator = () => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
			<AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
			<AuthStack.Screen name="Registration" component={SignupScreen} options={{ headerShown: false }} />
		</AuthStack.Navigator>
	)
}
