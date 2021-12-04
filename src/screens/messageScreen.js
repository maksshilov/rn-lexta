import React, { Fragment, useState } from 'react'
import { TouchableOpacity, Button, Dimensions, ScrollView, Text, View, StyleSheet, Image } from 'react-native'
import { connect, useSelector } from 'react-redux'
import LextaService from '../services/LextaService'
import store from '../store'
import md5 from 'md5'
import { getDocumentAsync } from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
// import RNFetchBlob from 'rn-fetch-blob'
import * as FileSystem from 'expo-file-system'
import { launchImageLibrary } from 'react-native-image-picker'
import { ncAuthAddObj, ncAuthAddObjXML, ncAuthFetch } from '../ncAuth'

const lexta = new LextaService()
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const MessageScreen = () => {
	const [messagesType, setMessagesType] = useState(0)

	const handleGetMessages = async (type) => {
		const lexta = new LextaService()
		lexta
			.getMessages(store.getState().reducerUser.Token, md5(store.getState().reducerUser.Email), type)
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err))
	}

	// FILE PICKER code start
	const [image1, setImage1] = useState(null)
	const [image2, setImage2] = useState(null)
	const [image3, setImage3] = useState(null)
	const { Email } = useSelector((state) => state.profile)
	const { token } = useSelector((state) => state.auth)

	const uploadImage = async () => {
		const data = new FormData()
		// data.append('user', Email)
		// data.append('token', token)
		data.append('LoadProfileImg', {
			uri: image ? image : '',
			name: 'avatar',
			type: 'image/jpeg',
		})
		console.log(data)
		const response = await fetch('gs://rn-todo-app-4e018.appspot.com', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: data,
		})
		const responseData = await response.json()
		console.log(responseData)
		// FileSystem.uploadAsync('https://lexta.pro/api/LoadingProfileImage.php', image, {
		// 	uploadType: FileSystem.FileSystemUploadType.MULTIPART,
		// 	fieldName: 'LoadProfileImg',
		// 	parameters: {
		// 		user: '',
		// 		token: '',
		// 	},
		// }).then((res) => console.log(JSON.parse(res.body)))
	}

	const pickImage1 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.cancelled) {
			console.log(result)
			setImage1(result.uri)
		}
	}
	const pickImage2 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.cancelled) {
			console.log(result)
			setImage2(result.uri)
		}
	}
	const pickImage3 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.cancelled) {
			console.log(result)
			setImage3(result.uri)
		}
	}
	// FILE PICKER code end

	return (
		<Fragment>
			<View
				style={{
					backgroundColor: '#fff',
					paddingTop: 50,
					alignContent: 'center',
				}}
			>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<TouchableOpacity
						onPress={() => {
							handleGetMessages(0)
							setMessagesType(0)
						}}
					>
						<View
							style={[
								{
									borderWidth: 1,
									borderRightWidth: 0,
									borderRadius: 10,
									borderTopEndRadius: 0,
									borderBottomEndRadius: 0,
									paddingHorizontal: 10,
									paddingVertical: 5,
									width: windowWidth * 0.4,
									alignItems: 'center',
									backgroundColor: '#fff',
								},
								messagesType === 0
									? {
											backgroundColor: '#912e33',
									  }
									: null,
							]}
						>
							<Text
								style={[
									{
										fontFamily: 'gothampro-regular',
										fontSize: 15,
										color: '#000',
									},
									messagesType === 0
										? {
												color: '#fff',
										  }
										: null,
								]}
							>
								Входящие
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							handleGetMessages(1)
							setMessagesType(1)
						}}
					>
						<View
							style={[
								{
									borderWidth: 1,
									borderRadius: 10,
									borderTopStartRadius: 0,
									borderBottomStartRadius: 0,
									paddingHorizontal: 10,
									paddingVertical: 5,
									width: windowWidth * 0.4,
									alignItems: 'center',
								},
								messagesType === 1
									? {
											backgroundColor: '#912e33',
									  }
									: null,
							]}
						>
							<Text
								style={[
									{
										fontFamily: 'gothampro-regular',
										fontSize: 15,
										color: '#000',
									},
									messagesType === 1
										? {
												color: '#fff',
										  }
										: null,
								]}
							>
								Исходящие
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<ScrollView
					contentContainerStyle={{
						backgroundColor: '#fff',
						paddingVertical: 20,
						alignItems: 'center',
					}}
				>
					<View
						style={{
							width: windowWidth * 0.9,
						}}
					>
						<View
							style={{
								backgroundColor: '#912e33',
								padding: 5,
								borderWidth: 1,
								borderBottomWidth: 0,
								borderRadius: 10,
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
							}}
						>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									color: '#fff',
									fontSize: 12,
									lineHeight: 15,
								}}
							>
								Коммерческая недвижимостьб 150 м2{'\n'}
								Обнинск{'\n'}
								Белкинская, д.1
							</Text>
						</View>
						<View
							style={{
								borderWidth: 1,
								borderTopWidth: 0,
								borderRadius: 10,
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
								backgroundColor: '#eee',
								padding: 5,
							}}
						>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									color: '#000',
									fontSize: 12,
									lineHeight: 15,
								}}
							>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. A eum eius maxime nobis beatae nulla labore debitis eligendi
								quam voluptatum in laboriosam enim, odio inventore, blanditiis unde nemo autem accusantium.
							</Text>
						</View>
						<View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									color: '#999',
									fontSize: 10,
									lineHeight: 15,
								}}
							>
								2019.12.32 | 25:99
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
			<View
				style={{
					marginVertical: 50,
					width: windowWidth,
				}}
			>
				<View>
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={pickImage1}>
							<Text style={styles.buttonTextStyle}>Select File</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={pickImage2}>
							<Text style={styles.buttonTextStyle}>Select File</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={pickImage3}>
							<Text style={styles.buttonTextStyle}>Select File</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={uploadImage}>
						<Text style={styles.buttonTextStyle}>Upload File</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ flexDirection: 'row' }}>
				{image1 ? (
					<View>
						<Image source={{ uri: image1 }} style={{ width: 100, height: 100 }} />
					</View>
				) : null}
				{image2 ? (
					<View>
						<Image source={{ uri: image2 }} style={{ width: 100, height: 100 }} />
					</View>
				) : null}
				{image3 ? (
					<View>
						<Image source={{ uri: image3 }} style={{ width: 100, height: 100 }} />
					</View>
				) : null}
			</View>
			<View
				style={{
					flexDirection: 'row',
					marginTop: 20,
					justifyContent: 'space-around',
					width: windowWidth,
				}}
			>
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity
						onPress={() => ncAuthFetch('qwe@qwe.qwe', 'qwe')}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 15,
							width: windowWidth * 0.3,
							height: windowWidth * 0.1,
							backgroundColor: '#74c8b4',
						}}
					>
						<Text>QWE</Text>
					</TouchableOpacity>
				</View>
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity
						onPress={() => ncAuthFetch('zxc@zxc.zxc', 'zxc')}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 15,
							width: windowWidth * 0.3,
							height: windowWidth * 0.1,
							backgroundColor: '#79c874',
						}}
					>
						<Text>ZXC</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ width: windowWidth, alignItems: 'center', marginTop: 20 }}>
				<TouchableOpacity
					onPress={() => {
						let data = new FormData()
						data.append('cc', 6)
						data.append('sub', 10)
						data.append('posting', 1)
						data.append('f_Price', '123027')
						data.append('f_Img_file[]', { uri: image1, name: image1.split('/').pop(), type: 'image/jpg' })
						// data.append('multifile_id[Img][]')
						// data.append('multifile_upload_index[Img][]', 1)
						data.append('f_Img_file[]', { uri: image2, name: image2.split('/').pop(), type: 'image/jpg' })
						// data.append('multifile_id[Img][]')
						// data.append('multifile_upload_index[Img][]', 2)
						data.append('f_Img_file[]', { uri: image3, name: image3.split('/').pop(), type: 'image/jpg' })
						// data.append('multifile_id[Img][]')
						// data.append('multifile_upload_index[Img][]', 3)
						// data.append('settings_Img[use_name]', '')
						// data.append('settings_Img[path]', '')
						data.append('settings_Img[use_preview]', 1)
						data.append('settings_Img[preview_width]', 120)
						data.append('settings_Img[preview_height]', 100)
						// data.append('settings_Img[preview_mode]', 0)
						// data.append('settings_Img[resize_width]', 0)
						// data.append('settings_Img[resize_height]', 0)
						// data.append('settings_Img[resize_mode]', 0)
						// data.append('settings_Img[crop_x0]', 0)
						// data.append('settings_Img[crop_y0]', 0)
						// data.append('settings_Img[crop_x1]', 0)
						// data.append('settings_Img[crop_y1]', 0)
						// data.append('settings_Img[crop_mode]', 0)
						// data.append('settings_Img[crop_width]', 0)
						// data.append('settings_Img[crop_height]', 0)
						// data.append('settings_Img[crop_ignore_width]', 0)
						// data.append('settings_Img[crop_ignore_height]', 0)
						// data.append('settings_Img[preview_crop_x0]', 0)
						// data.append('settings_Img[preview_crop_y0]', 0)
						// data.append('settings_Img[preview_crop_x1]', 0)
						// data.append('settings_Img[preview_crop_y1]', 0)
						// data.append('settings_Img[preview_crop_mode]', 0)
						// data.append('settings_Img[preview_crop_width]', 0)
						// data.append('settings_Img[preview_crop_height]', 0)
						// data.append('settings_Img[preview_crop_ignore_width]', 0)
						// data.append('settings_Img[preview_crop_ignore_height]', 0)
						// data.append('settings_Img[min]', 0)
						// data.append('settings_Img[max]', 0)
						data.append('settings_Img_hash', 'f421907ea9d21e51ad744d7d0f33eac7')

						// console.log(data)
						// console.log(File(image))
						ncAuthAddObjXML(data)
					}}
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 15,
						width: windowWidth * 0.3,
						height: windowWidth * 0.1,
						backgroundColor: '#c8b374',
					}}
				>
					<Text>Object</Text>
				</TouchableOpacity>
			</View>
		</Fragment>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
export default connect(mapStateToProps)(MessageScreen)

const styles = StyleSheet.create({
	mainBody: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	buttonStyle: {
		backgroundColor: '#307ecc',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#307ecc',
		height: 40,
		alignItems: 'center',
		borderRadius: 30,
		// marginLeft: 35,
		// marginRight: 35,
		// marginTop: 15,
	},
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 16,
	},
	textStyle: {
		backgroundColor: '#fff',
		fontSize: 15,
		marginTop: 16,
		marginLeft: 35,
		marginRight: 35,
		textAlign: 'center',
	},
})
