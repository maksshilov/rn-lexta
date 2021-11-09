import md5 from 'md5'
import React, { useEffect, useState } from 'react'
import {
	FlatList,
	Image,
	ImageBackground,
	Text,
	View,
	RefreshControl,
	ScrollView,
	ActivityIndicator,
} from 'react-native'
import ObjectCard from '../components/ObjectCard'
import LextaService from '../services/LextaService'
import store from '../store'
import { connect } from 'react-redux'
import updateToken from '../services/updateToken'

const FavScreen = ({ state, navigation }) => {
	const lexta = new LextaService()
	const { Token, Email } = store.getState().reducerUser

	const [loading, setLoading] = useState(false)

	const [userFavorites, setUserFavorites] = useState([])
	const [refreshing, setRefreshing] = useState(true)
	const [favObjects, setFavObjects] = useState([])

	const getFavoritesObjects = async () => {
		const handlegetFavoritesObjects = async (json) => {
			const favArray = JSON.parse(json[0].Favorites)
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
				console.log(json.Message)
				if (json.Message !== 'auth error') {
					console.log('FAVSCREEN.JS', json.Message)
					handlegetFavoritesObjects(json)
				} else {
					console.log('FAVSCREEN.JS >>> token is dead > update token')
					updateToken()
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

	const renderItem = ({ item }) => (
		<ObjectCard item={item[0]} userFavorites={userFavorites} navigation={navigation} />
	)

	return userFavorites.length ? (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				paddingTop: 30,
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
					ТУ{'\n'}ТЬ{'\n'}НИ{'\n'}ЧА{'\n'}ВО
				</Text>
			)}
		</ScrollView>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
const mapDispatchToProps = (dispatch) => {
	return {
		// setUserInfo: (token) => dispatch({ type: 'SET_USER_INFO', payload: token }),
		// setObjects: (payload) => dispatch({ type: 'SET_OBJECTS', payload }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FavScreen)
