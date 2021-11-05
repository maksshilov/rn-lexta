import md5 from 'md5'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, Text, View, RefreshControl } from 'react-native'
import ObjectCard from '../components/ObjectCard'
import LextaService from '../services/LextaService'
import store from '../store'
import { connect } from 'react-redux'

const FavScreen = ({ state, navigation }) => {
	const lexta = new LextaService()

	const { Token, Email } = store.getState().reducerUser

	const [userFavorites, setUserFavorites] = useState([])
	const [refreshing, setRefreshing] = useState(true)
	const [favObjects, setFavObjects] = useState([])

	const getFavoritesObjects = async () => {
		lexta
			.getUserInfo(Token, Email)
			.then((res) => res.json())
			.then(async (json) => {
				let favObjectsId = JSON.parse(json[0].Favorites)
				let favObjects = []
				for (let i = 0; i < favObjectsId.length; i++) {
					const objectId = favObjectsId[i]

					await lexta
						.getSearchObjects(
							`token=${store.getState().reducerUser.Token}&
						 user=${md5(store.getState().reducerUser.Email)}&
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

	return (
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
