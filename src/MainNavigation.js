import React from 'react'
import { Image, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import MainScreen from './screens/MainScreen'
import SearchScreen from './screens/SearchScreen'
import FavScreen from './screens/FavScreen'
import MessageScreen from './screens/MessageScreen'

const Tab = createMaterialBottomTabNavigator()

export default function MainNavigation() {
	return (
		<Tab.Navigator
			shifting={false}
			barStyle={{ backgroundColor: '#fff' }}
			activeColor="#8f2d32"
		>
			<Tab.Screen
				name="main"
				options={{
					tabBarLabel: (
						<Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>
							Главная
						</Text>
					),
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="home-outline" color={color} size={24} />
					),
				}}
			>
				{(props) => <MainScreen {...props} />}
			</Tab.Screen>
			<Tab.Screen
				name="search"
				component={SearchScreen}
				options={{
					tabBarLabel: (
						<Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>Поиск</Text>
					),
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="magnify" color={color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="logo"
				component={MainScreen}
				options={{
					tabBarLabel: '',
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={require('../assets/logo_bottom.png')}
							style={{
								width: '120%',
								height: '120%',
								marginTop: 5,
							}}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="fav"
				component={FavScreen}
				options={{
					tabBarLabel: (
						<Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>
							Избранное
						</Text>
					),
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="heart-outline" color={color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="message"
				component={MessageScreen}
				options={{
					tabBarLabel: (
						<Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>
							Сообщения
						</Text>
					),
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="forum-outline" color={color} size={24} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}
