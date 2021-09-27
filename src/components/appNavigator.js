import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import StartScreen from '../screens/StartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegistrationScreen from '../screens/RegistrationScreen'

import MainNavigation from '../MainNavigation'
import ObjectScreen from '../screens/ObjectScreen'
import SearchScreenResult from '../screens/SearchScreenResult'

// PROFILE MENU start
import ProfileScreen from '../screens/ProfileScreen'
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen'
import PassChangeScreen from '../screens/PassChangeScreen'
import MyObjects from '../screens/MyObjects'
import AddObject from '../screens/AddObject'
import FavScreen from '../screens/FavScreen'
// PROFILE MENU end

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
					name="Object"
					component={ObjectScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SearchResult"
					component={SearchScreenResult}
					options={{ headerShown: false }}
				/>
				{/* PROFILE MENU start */}
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
					name="MyObjects"
					component={MyObjects}
					options={{
						headerShown: true,
						title: 'Мои объявления',
						headerTitleStyle: { fontFamily: 'gothampro-bold' },
					}}
				/>
				<Stack.Screen
					name="AddObject"
					component={AddObject}
					options={{
						headerShown: true,
						title: 'Добавить',
						headerTitleStyle: { fontFamily: 'gothampro-bold' },
					}}
				/>
				<Stack.Screen
					name="FavScreen"
					component={FavScreen}
					options={{
						headerShown: true,
						title: 'Избранное',
						headerTitleStyle: { fontFamily: 'gothampro-bold' },
					}}
				/>
				{/* PROFILE MENU end */}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
