import md5 from 'md5'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import LextaService from '../services/LextaService'
import store from '../store'
import { SET_PROFILE } from '../store/actions/profile'

export default function Like(props) {
	let lextaService = new LextaService()
	const dispatch = useDispatch()
	const { objectId } = props
	const [userFavorites, setUserFavorites] = useState([])
	const [like, setLike] = useState(false)

	const { token: Token } = useSelector((state) => state.auth)
	const { Email } = useSelector((state) => state.profile)

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
					.then((json) => {
						dispatch({
							type: SET_PROFILE,
							payload: json[0],
						})
						return json
					})
					.then((json) => console.log('SEARCHSCREENRESULTS.JS > favorites after >', json[0].Favorites))
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
			size={20}
			// style={{ marginRight: 5 }}
		/>
	)
}
