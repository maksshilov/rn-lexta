import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import LextaService from '../services/LextaService'
import ObjectCard from '../components/ObjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { ending } from '../components/scripts'
import { fonts } from '../styles/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import md5 from 'md5'
import { updateTokenAction } from '../store/actions/auth'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const lexta = new LextaService()

export default function SearchScreenResult({ route, navigation }) {
	let {
		cityOrRegion,
		catalogType,
		f_Category,
		f_NumberRooms,
		objectType,
		priceFrom,
		priceTo,
		totalAreaFrom,
		totalAreaTo,
		kitchenAreaFrom,
		kitchenAreaTo,
		floorFrom,
		floorTo,
		whichFloor1,
		whichFloor2,
		whichFloor3,
		f_HouseType,
		mortgage,
		video,
	} = route.params.formState

	const dispatch = useDispatch()

	// const [userFavorites, setUserFavorites] = useState([])

	let userFavorites = useSelector((state) => state.profile.Favorites)
	userFavorites = JSON.parse(userFavorites)
	console.log(userFavorites)

	const [loading, setLoading] = useState(false)
	const [dataSource, setDataSource] = useState([])
	const [curPos, setCurPos] = useState(0)
	const [isListEnd, setIsListEnd] = useState(false)

	const getData = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const { Email, Token, UserId, expirationDate } = JSON.parse(userData)

		let params = `
		token=${Token}&
		user=${md5(Email)}&
		cityOrRegion=${cityOrRegion}&
		catalogType=${catalogType}&
		f_Category=${f_Category}&
		f_NumberRooms=${f_NumberRooms}&
		objectType=${objectType}&
		priceFrom=${priceFrom}&
		priceTo=${priceTo}&
		totalAreaFrom=${totalAreaFrom}&
		totalAreaTo=${totalAreaTo}&
		kitchenAreaFrom=${kitchenAreaFrom}&
		kitchenAreaTo=${kitchenAreaTo}&
		floorFrom=${floorFrom}&
		floorTo=${floorTo}&
		whichFloor1=${whichFloor1}&
		whichFloor2=${whichFloor2}&
		whichFloor3=${whichFloor3}&
		f_HouseType=${f_HouseType}&
		mortgage=${mortgage}&
		video=${video}&
		recNum=5&
		curPos=${curPos}
		`
		if (!loading && !isListEnd) {
			setLoading(true)
			lexta
				.getSearchObjects(params)
				.then((response) => response.json())
				.then((responseJson) => {
					if (responseJson.length > 0) {
						setCurPos(curPos + 5)
						setDataSource([...dataSource, ...responseJson])
						setLoading(false)
					} else {
						setIsListEnd(true)
						setLoading(false)
					}
				})
				.catch((error) => {
					console.error(error)
				})
		}

		// setLoading(true)
		// lexta
		// 	.getSearchObjects(params)
		// 	.then((response) => response.json())
		// 	.then((responseJson) => {
		// 		setCurPos(curPos + 5)
		// 		setDataSource([...dataSource, ...responseJson])
		// 		setLoading(false)
		// 	})
		// 	.catch((error) => {
		// 		console.error(error)
		// 	})
	}

	const renderFooter = () => {
		return (
			<View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
				{loading ? <ActivityIndicator color="black" style={{ margin: 15 }} /> : null}
			</View>
		)
	}

	useEffect(() => {
		getData()
	}, [])
	// FROM SEARCHSCREEN.JS START --->
	// const handleSearch = async () => {
	// 	if (new Date(expirationDate) <= new Date()) {
	// 		console.log('SearchScreen.js > if (expirationDate <= new Date())')
	// 		try {
	// 			await dispatch(updateTokenAction(Email, Token, UserId, userData))

	// 			lexta
	// 				.getSearchObjects(params)
	// 				.then((res) => {
	// 					console.log(res.status)
	// 					return res.json()
	// 				})
	// 				.then((result) => navigation.navigate('Elements', { screen: 'SearchResult', params: { result } }))
	// 				.catch((err) => console.log(err))
	// 		} catch (err) {
	// 			Alert.alert('Ошибка', 'Войти ещё раз', [{ text: 'Ok', onPress: () => authActions.logout() }])
	// 			// setError(err.message)
	// 		}
	// 	} else {
	// 		console.log('SearchScreen.js > ok!')

	// 		lexta
	// 			.getSearchObjects(params)
	// 			.then((res) => res.json())
	// 			.then((result) => navigation.navigate('Elements', { screen: 'SearchResult', params: { result } }))
	// 			.catch((err) => console.log(err))
	// 	}
	// }
	// FROM SEARCHSCREEN.JS <--- END

	// const { token } = useSelector((state) => state.auth)
	// const { Email } = useSelector((state) => state.profile)

	// const getFavorites = async () => {
	// await lexta
	// .getUserInfo(token, Email)
	// .then((res) => res.json())
	// // .then((json) => setUserFavorites(JSON.parse(json[0].Favorites)))
	// }

	const renderItem = ({ item }) => <ObjectCard item={item} userFavorites={userFavorites} navigation={navigation} />

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
					fontFamily: fonts.bold,
					fontSize: 15,
					marginVertical: 20,
					textAlign: 'center',
				}}
			>
				Нашлось {dataSource.length} объявлен{ending(dataSource.length)}
			</Text>

			<FlatList
				data={dataSource}
				renderItem={renderItem}
				keyExtractor={(item) => item.Message_ID}
				ListFooterComponent={renderFooter}
				onEndReached={getData}
				onEndReachedThreshold={0.5}
			/>
		</View>
	)
}
