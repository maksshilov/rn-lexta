import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { bootstrap } from './src/bootstrap'
import LoginScreen from './src/screens/loginScreen'
import MainScreen from './src/screens/mainScreen'
import SearchScreen from './src/screens/searchScreen'
import FavScreen from './src/screens/favScreen'
import MessageScreen from './src/screens/messageScreen'

const Tab = createMaterialBottomTabNavigator()

const App = () => {
	const [isReady, setIsReady] = React.useState(false)
	const [token, setToken] = React.useState(false)
	const [data, setData] = React.useState(false)

	if (!isReady) {
		return (
			<React.Fragment>
				<AppLoading
					startAsync={bootstrap}
					onFinish={() => setIsReady(true)}
					onError={(err) => console.log(err)}
				/>
			</React.Fragment>
		)
	}

	let content = (
		<NavigationContainer>
			<Tab.Navigator
				shifting={false}
				barStyle={{ backgroundColor: '#fff' }}
				activeColor="#8f2d32"
			>
				<Tab.Screen
					name="main"
					component={MainScreen}
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
				/>
				<Tab.Screen
					name="search"
					component={SearchScreen}
					options={{
						tabBarLabel: (
							<Text style={{ fontSize: 11, fontFamily: 'gothampro-regular' }}>
								Поиск
							</Text>
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
								source={require('./assets/logo_bottom.png')}
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
		</NavigationContainer>
	)

	return content
}

export default App

// let datas = data ? (
// 	data.map((item) => {
// 		return (
// 			<View key={item.Message_ID} style={{ paddingVertical: 10 }}>
// 				<Text>City: {item.City}</Text>
// 				<Text>HouseType: {item.HouseType}</Text>
// 				<Text>BalconyType: {item.BalconyType}</Text>
// 				<Text>Floor: {item.Floor}</Text>
// 			</View>
// 		)
// 	})
// ) : (
// 	<Text>Press "Get objects"</Text>
// )

// const Main = () => {
// 	return (
// 		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// 			<Button title="Get objects" onPress={() => getObj(false)} />
// 			<View style={{ flexDirection: 'column' }}>{datas}</View>
// 			<Button title="Clear" onPress={() => setData(false)} />
// 			<Button title="Exit" onPress={() => setToken(false)} />
// 		</View>
// 	)
// }

// const getObj = async () => {
// 	if (token) {
// 		await fetch(
// 			`https://lexta.kproject.su/api/GetObjects.php?token=${token}&user=admin@lexta.kproject.su`
// 		)
// 			.then((res) => res.json())
// 			.then((json) => setData(json))
// 	}
// }
