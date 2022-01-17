import React, { Fragment } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import md5 from 'md5'

import { colors, fonts } from '../styles/constants'
import { useState } from 'react'
import LextaService from '../services/LextaService'
import { SET_PROFILE } from '../store/actions/profile'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function AvaScreen({ route }) {
	const dispatch = useDispatch()
	const [photo, setPhoto] = useState('')
	const { token } = useSelector((state) => state.auth)
	const { Email, Photo } = useSelector((state) => state.profile)

	const uploadImage = async () => {
		FileSystem.uploadAsync('https://lexta.pro/api/LoadingProfileImage.php', photo, {
			uploadType: FileSystem.FileSystemUploadType.MULTIPART,
			fieldName: 'LoadProfileImg',
			parameters: {
				user: md5(Email),
				token: token,
			},
		})
			.then((res) => JSON.parse(res.body))
			.then((json) => {
				if (json.status) {
					let lexta = new LextaService()
					lexta
						.getUserInfo(token, Email)
						.then((res) => res.json())
						.then((json) => {
							if (json) {
								dispatch({
									type: SET_PROFILE,
									payload: json[0],
								})
								setPhoto('')
							}
						})
				}
			})
	}

	const pickPhoto = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.cancelled) {
			console.log(result)
			setPhoto(result.uri)
		}
	}

	return (
		<ScrollView contentContainerStyle={{ flex: 1, paddingVertical: 20, backgroundColor: '#fff', alignItems: 'center' }}>
			<View style={{ marginBottom: 20 }}>
				{Photo ? (
					<Image source={{ uri: Photo }} style={{ width: windowWidth * 0.6, height: windowWidth * 0.6, borderRadius: 200 }} />
				) : (
					<MaterialCommunityIcons name="account-circle" size={windowWidth * 0.6} color="grey" />
				)}
			</View>
			{Photo ? null : (
				<TouchableOpacity>
					<View
						style={{
							width: windowWidth * 0.7,
							height: windowWidth * 0.13,
							backgroundColor: colors.red,
							borderRadius: 10,
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: 20,
						}}
					>
						<Text style={{ fontFamily: fonts.regular, fontSize: 20, color: '#fff' }}>Добавить фото</Text>
					</View>
				</TouchableOpacity>
			)}
			{Photo ? (
				<Fragment>
					{/* <TouchableOpacity>
						<View
							style={{
								width: windowWidth * 0.7,
								height: windowWidth * 0.13,
								backgroundColor: colors.red,
								borderRadius: 10,
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: 20,
							}}
						>
							<Text style={{ fontFamily: fonts.regular, fontSize: 20, color: '#fff' }}>Удалить фото</Text>
						</View>
					</TouchableOpacity> */}
					<TouchableOpacity onPress={pickPhoto}>
						<View
							style={{
								width: windowWidth * 0.7,
								height: windowWidth * 0.13,
								backgroundColor: colors.red,
								borderRadius: 10,
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: 20,
							}}
						>
							<Text style={{ fontFamily: fonts.regular, fontSize: 20, color: '#fff' }}>Выбрать новое фото</Text>
						</View>
					</TouchableOpacity>
				</Fragment>
			) : null}
			{photo ? (
				<View style={{ alignItems: 'center' }}>
					<Image source={{ uri: photo }} style={{ width: 100, height: 100, borderRadius: 100 }} />
					<TouchableOpacity onPress={uploadImage}>
						<View
							style={{
								width: windowWidth * 0.3,
								height: windowWidth * 0.1,
								backgroundColor: colors.red,
								borderRadius: 10,
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: 20,
							}}
						>
							<Text style={{ fontFamily: fonts.regular, fontSize: 13, color: '#fff' }}>Загрузить</Text>
						</View>
					</TouchableOpacity>
				</View>
			) : null}
		</ScrollView>
	)
}
