import md5 from 'md5'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, Text, View } from 'react-native'
import ObjectCard from '../components/ObjectCard'
import LextaService from '../services/LextaService'
import store from '../store'
import { connect } from 'react-redux'

const FavScreen = ({ state, navigation }) => {
	const { Token, Email } = store.getState().reducerUser

	const lextaService = new LextaService()

	const [userFavorites, setUserFavorites] = useState([])
	const [favObjects, setFavObjects] = useState([])

	const getFavoritesObjects = async () => {
		let email = md5(Email)
		await lextaService
			.getAllObjects(Token, email)
			.then((res) => res.json())
			.then(async (allObjects) => {
				lextaService
					.getUserInfo(Token, Email)
					.then((res) => res.json())
					.then((favorites) => {
						let favObjectsId = JSON.parse(favorites[0].Favorites)
						let favObjects = []
						for (let i = 0; i < favObjectsId.length; i++) {
							const element = favObjectsId[i]
							favObjects.push(allObjects.filter((i) => i.Message_ID == element)[0])
						}
						setUserFavorites(favObjectsId)
						setFavObjects(favObjects)
					})
			})
	}
	useEffect(() => {
		getFavoritesObjects()
	}, [])

	const renderItem = ({ item }) => (
		<ObjectCard item={item} userFavorites={userFavorites} navigation={navigation} />
	)

	return (
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
				data={favObjects}
				renderItem={renderItem}
				keyExtractor={(item) => item.Message_ID}
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
