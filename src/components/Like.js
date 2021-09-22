import md5 from 'md5'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LextaService from '../services/LextaService'
import store from '../store'

export default function Like(props) {
	lextaService = new LextaService()
	const { objectId } = props
	const [userFavorites, setUserFavorites] = useState([])
	const [like, setLike] = useState(false)

	const { Token, Email } = store.getState().reducerUser

	useEffect(() => {
		setLike(props.like)
	}, [props.like])

	const handleSetFavorites = async (objectId) => {
		const email = md5(Email)
		await lextaService
			.getUserInfo(Token, Email)
			.then((res) => res.json())
			.then(async (json) => {
				setUserFavorites(JSON.parse(json[0].Favorites))
				// console.log('SEARCHSCREENRESULTS.JS > favorites before >', json[0].Favorites)
				if (JSON.parse(json[0].Favorites).filter((i) => i == objectId).length) {
					await lextaService.setLikeUnlike(objectId, 'dislike', Token, email)
					setLike(false)
				} else {
					await lextaService.setLikeUnlike(objectId, 'like', Token, email)
					setLike(true)
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
	return (
		<MaterialCommunityIcons
			onPress={() => {
				handleSetFavorites(objectId)
			}}
			name={like ? 'heart' : 'heart-outline'}
			color="#912e33"
			size={25}
			style={{ marginRight: 5 }}
		/>
	)
}
