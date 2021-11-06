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
	const ending = (count) => {
		switch (true) {
			case Boolean(count % 10) && count % 10 === 1 && count !== 11 && count !== 111:
				return 'ие'
				break
			case count % 10 > 1 &&
				count % 10 < 5 &&
				count !== 12 &&
				count !== 13 &&
				count !== 14 &&
				count !== 112 &&
				count !== 113 &&
				count !== 114:
				return 'ия'
				break
			case count > 4:
				return 'ий'
				break
			default:
				return 'default'
				break
		}
	}
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
				Туть нашлось {DATA.length} объявлен{ending(DATA.length)}
			</Text>

			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.Message_ID}
			/>
		</View>
	)
}
