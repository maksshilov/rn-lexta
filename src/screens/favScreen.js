import md5 from 'md5'
import React, { Fragment, useEffect, useState } from 'react'
import { FlatList, Text, View, RefreshControl, ScrollView, ActivityIndicator, Animated } from 'react-native'
import ObjectCard from '../components/ObjectCard'
import LextaService from '../services/LextaService'
import { useDispatch } from 'react-redux'
import { updateTokenAction } from '../store/actions/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'

export default FavScreen = ({ route, navigation }) => {
	const dispatch = useDispatch()

	const lexta = new LextaService()

	const [loading, setLoading] = useState(false)

	const [userFavorites, setUserFavorites] = useState([])
	const [refreshing, setRefreshing] = useState(true)
	const [favObjects, setFavObjects] = useState([])

	const getFavoritesObjects = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const userDataJson = JSON.parse(userData)
		const { Email, Token, userId } = userDataJson

		const handlegetFavoritesObjects = async (json) => {
			let favArray = JSON.parse(json[0].Favorites)
			if (favArray.length) {
				let favObjectsId = favArray
				let favObjects = []
				for (let i = 0; i < favObjectsId.length; i++) {
					const objectId = favObjectsId[i]

					await lexta
						.getSearchObjects(
							`token=${Token}&
							user=${md5(Email)}&
							objectId=${objectId}`
						)
						.then((res) => res.json())
						.then((result) => {
							setRefreshing(false)
							favObjects.push(result)
						})
						.catch((err) => console.log(err))
				}
				setUserFavorites(favObjectsId)
				setFavObjects(favObjects)
				setLoading(false)
			} else {
				setRefreshing(false)
				setLoading(false)
			}
		}

		setLoading(true)
		lexta
			.getUserInfo(Token, Email)
			.then((res) => {
				return res.json()
			})
			.then(async (json) => {
				if (json.Message !== 'auth error') {
					handlegetFavoritesObjects(json)
				} else {
					console.log('FAVSCREEN.JS >>> token is dead > update token')
					dispatch(updateTokenAction(Email, Token, userId, userData))
					setRefreshing(false)
					setLoading(false)
				}
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		getFavoritesObjects()
	}, [])

	const onRefresh = () => {
		setFavObjects([])
		getFavoritesObjects()
	}

	const renderItem = ({ item }) => <ObjectCard item={item[0]} userFavorites={userFavorites} navigation={navigation} />

	const scrollY = React.useRef(new Animated.Value(0)).current

	return userFavorites.length ? (
		<Fragment>
			{route.name === 'fav' && <Header navigation={navigation} scrollY={scrollY} />}
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					paddingTop: 0,
					backgroundColor: '#fff',
				}}
			>
				<FlatList
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					data={favObjects}
					renderItem={renderItem}
					keyExtractor={(item) => {
						return item[0].Message_ID
					}}
				/>
			</View>
		</Fragment>
	) : (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#fff',
			}}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			{loading ? (
				<ActivityIndicator color="#912e33" />
			) : (
				<Text style={{ fontFamily: 'gothampro-bold', fontSize: 30, color: '#999' }}>
					Вы пока ничего{'\n'}не добавили{'\n'}сюда
				</Text>
			)}
		</ScrollView>
	)
}
