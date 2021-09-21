import React, { useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { numSplit } from '../components/scripts'
import PhoneShow from '../components/PhoneShow'
import LextaService from '../services/LextaService'
import store from '../store'
import md5 from 'md5'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function SearchScreenResult({ route, navigation }) {
	lextaService = new LextaService()
	const DATA = route.params.result
	const [like, setLike] = useState(false)

	const { Token, Email } = store.getState().reducerUser

	// async function getUserFavorites() {
	// 	let userFavorites = await lextaService
	// 		.getUserInfo(Token, Email)
	// 		.then((res) => res.json())
	// 		// .then((json) => JSON.parse(json[0].Favorites))
	// 		.catch((err) => console.error(err))
	// 	return userFavorites
	// }

	// console.log(getUserFavorites())

	const handleCheckFavorites = async (objectId) => {
		const email = md5(Email)
		await lextaService
			.getUserInfo(Token, Email)
			.then((res) => res.json())
			.then(async (json) => {
				console.log('SEARCHSCREENRESULTS.JS > favorites before >', json[0].Favorites)
				if (JSON.parse(json[0].Favorites).filter((i) => i == objectId).length) {
					await lextaService.setLikeUnlike(objectId, 'dislike', Token, email)
				} else {
					await lextaService.setLikeUnlike(objectId, 'like', Token, email)
				}
			})
			.then(() => {
				lextaService
					.getUserInfo(Token, Email)
					.then((res) => res.json())
					.then((json) =>
						console.log('SEARCHSCREENRESULTS.JS > favorites after >', json[0].Favorites)
					)
			})
			.catch((err) => console.error(err))
	}

	const renderItem = ({ item }) => (
		<View style={{ width: windowWidth, alignItems: 'center' }}>
			<TouchableOpacity
				onPress={() => {
					console.log(item)
					navigation.navigate('Object', {
						item,
					})
				}}
				android_ripple
				activeOpacity={0.5}
				key={item.Message_ID}
				style={{
					backgroundColor: '#fff',
					elevation: 5,
					width: windowWidth * 0.88,
					marginBottom: 20,
				}}
			>
				{/* <ObjectCarouselSearch imgArray={item.Img} /> */}
				<View>
					<Image
						source={{ uri: `https://lexta.pro${item.Img[0]}` }}
						style={{ width: windowWidth * 0.88, height: windowWidth * 0.88 }}
						resizeMethod="scale"
					/>
				</View>
				<View style={{ paddingHorizontal: 10 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontFamily: 'gothampro-bold',
								fontSize: 20,
								marginVertical: 10,
							}}
						>
							{numSplit(item.Price)} руб.
						</Text>
						<MaterialCommunityIcons
							onPress={() => {
								handleCheckFavorites(item.Message_ID)
							}}
							name={like ? 'heart' : 'heart-outline'}
							color="#912e33"
							size={25}
							style={{ marginRight: 5 }}
						/>
					</View>
					<Text
						style={{
							fontFamily: 'gothampro-regular',
							fontSize: 15,
							lineHeight: 20,
							marginBottom: 20,
						}}
					>
						{item.Name}, {item.ObjectType}
						{'\n'}
						{item.TotalArea} м2,{'\n'}
						{item.Floor}/{item.FloorsInHouse} эт.
					</Text>
					<Text
						style={{
							fontFamily: 'gothampro-regular',
							fontSize: 15,
							lineHeight: 20,
							marginBottom: 20,
						}}
					>
						{item.City}, {item.Region}
						{'\n'}
						{item.Street}, {item.HouseNumber}
					</Text>
				</View>
				<PhoneShow phoneNumber={item.Phone} />
			</TouchableOpacity>
		</View>
	)

	return (
		<View style={{ alignItems: 'center', paddingTop: 20 }}>
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
