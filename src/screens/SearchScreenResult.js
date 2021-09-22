import React, { useState, useEffect } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import LextaService from '../services/LextaService'
import store from '../store'
import ObjectCard from '../components/ObjectCard'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function SearchScreenResult({ route, navigation }) {
	const lextaService = new LextaService()
	const DATA = route.params.result

	const [userFavorites, setUserFavorites] = useState([])

	const { Token, Email } = store.getState().reducerUser

	const getFavorites = async () => {
		await lextaService
			.getUserInfo(Token, Email)
			.then((res) => res.json())
			.then((json) => setUserFavorites(JSON.parse(json[0].Favorites)))
	}
	useEffect(() => {
		getFavorites()
	}, [])

	const renderItem = ({ item }) => (
		<ObjectCard item={item} userFavorites={userFavorites} navigation={navigation} />
	)

	return (
		<View
			style={{
				alignItems: 'center',
				paddingTop: 20,
				backgroundColor: '#fff',
				paddingBottom: 50,
			}}
		>
			<Text
				style={{
					fontFamily: 'gothampro-bold',
					fontSize: 15,
					marginVertical: 20,
					textAlign: 'center',
				}}
			>
				Найдено {DATA.length} объявление
			</Text>

			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.Message_ID}
			/>
		</View>
	)
}
