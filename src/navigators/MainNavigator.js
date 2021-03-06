import React from 'react'
import { Image, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import MainScreen from '../screens/MainScreen'
import SearchScreen from '../screens/SearchScreen'
import FavScreen from '../screens/FavScreen'
import MessageScreen from '../screens/MessageScreen'
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen'
import PassChangeScreen from '../screens/PassChangeScreen'
import MyObjects from '../screens/MyObjects'
import AddObject from '../screens/AddObject'
import ProfileScreen from '../screens/ProfileScreen'
import ObjectScreen from '../screens/ObjectScreen'
import SearchScreenResult from '../screens/SearchScreenResult'
import AvaScreen from '../screens/AvaScreen'
import NewsScreen from '../screens/NewsScreen'
import TravelScreen from '../screens/TravelScreen'

const screenOptions = {
	headerShown: true,
	headerTitleStyle: { fontFamily: 'gothampro-bold' },
}

const MainStack = createStackNavigator()
export const MainNavigator = () => {
	return (
		<MainStack.Navigator screenOptions={{ headerShown: false }}>
			<MainStack.Screen name="Tab" component={TabNavigator} />
			<MainStack.Screen name="ProfileMenu" component={ProfileMenuNavigator} />
			<MainStack.Screen name="Elements" component={ElementsStackNavigator} />
		</MainStack.Navigator>
	)
}

const BottomTab = createMaterialBottomTabNavigator()
export const TabNavigator = () => {
	return (
		<BottomTab.Navigator shifting={false} barStyle={{ backgroundColor: '#fff' }} activeColor="#8f2d32">
			<BottomTab.Screen
				name="main"
				options={{
					tabBarLabel: <Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>Главная</Text>,
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" color={color} size={24} />,
				}}
			>
				{(props) => <MainScreen {...props} />}
			</BottomTab.Screen>
			<BottomTab.Screen
				name="search"
				component={SearchScreen}
				options={{
					tabBarLabel: <Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>Поиск</Text>,
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" color={color} size={24} />,
				}}
			/>
			<BottomTab.Screen
				name="logo"
				component={MainScreen}
				options={{
					tabBarLabel: '',
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={require('../../assets/logo_bottom.png')}
							style={{
								width: '120%',
								height: '120%',
								marginTop: 5,
							}}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="fav"
				component={FavScreen}
				options={{
					tabBarLabel: <Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>Избранное</Text>,
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="heart-outline" color={color} size={24} />,
				}}
			/>
			<BottomTab.Screen
				name="messagesTab"
				component={MessageScreen}
				options={{
					tabBarLabel: <Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>Сообщения</Text>,
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="forum-outline" color={color} size={24} />,
				}}
			/>
		</BottomTab.Navigator>
	)
}

const ProfileMenuStack = createStackNavigator()
export const ProfileMenuNavigator = () => {
	return (
		<ProfileMenuStack.Navigator>
			{/* PROFILE MENU start */}
			<ProfileMenuStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

			<ProfileMenuStack.Screen
				name="Ava"
				component={AvaScreen}
				options={{
					...screenOptions,
					title: 'Фото',
				}}
			/>
			<ProfileMenuStack.Screen
				name="ProfileDetails"
				component={ProfileDetailsScreen}
				options={{
					...screenOptions,
					title: 'Мои данные',
				}}
			/>
			<ProfileMenuStack.Screen
				name="PassChange"
				component={PassChangeScreen}
				options={{
					...screenOptions,
					title: 'Изменение пароля',
				}}
			/>
			<ProfileMenuStack.Screen
				name="MyObjects"
				component={MyObjects}
				options={{
					...screenOptions,
					title: 'Мои объявления',
				}}
			/>
			<ProfileMenuStack.Screen
				name="AddObject"
				component={AddObject}
				options={{
					...screenOptions,
					title: 'Добавить',
				}}
			/>
			<ProfileMenuStack.Screen
				name="FavScreen"
				component={FavScreen}
				options={{
					...screenOptions,
					title: 'Избранное',
				}}
			/>
			{/* PROFILE MENU end */}
		</ProfileMenuStack.Navigator>
	)
}

const ElementsStack = createStackNavigator()
export const ElementsStackNavigator = () => {
	return (
		<ElementsStack.Navigator>
			<ElementsStack.Screen name="Object" component={ObjectScreen} options={{ headerShown: false }} />
			<ElementsStack.Screen name="SearchResult" component={SearchScreenResult} options={{ headerShown: false }} />
			<ElementsStack.Screen name="SearchCategoryResult" component={SearchScreenResult} options={{ headerShown: false }} />
			<ElementsStack.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
			<ElementsStack.Screen name="Travel" component={TravelScreen} options={{ headerShown: false }} />

			<ElementsStack.Screen
				name="MessagesStack"
				component={MessageScreen}
				options={{ ...screenOptions, headerShown: true, title: 'Сообщения' }}
			/>
		</ElementsStack.Navigator>
	)
}
