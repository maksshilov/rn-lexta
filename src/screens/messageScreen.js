import React, { Fragment, useState } from 'react'
import {
	TouchableOpacity,
	Button,
	Dimensions,
	ScrollView,
	Text,
	View,
	StyleSheet,
	Image,
} from 'react-native'
import { connect } from 'react-redux'
import LextaService from '../services/LextaService'
import store from '../store'
import md5 from 'md5'
import { getDocumentAsync } from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
// import RNFetchBlob from 'rn-fetch-blob'
import * as FileSystem from 'expo-file-system'

const lexta = new LextaService()
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const MessageScreen = ({ state }) => {
	const [messagesType, setMessagesType] = useState(0)

	const handleGetMessages = async (type) => {
		const lexta = new LextaService()
		lexta
			.getMessages(
				store.getState().reducerUser.Token,
				md5(store.getState().reducerUser.Email),
				type
			)
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err))
	}

	// FILE PICKER code start
	const [image, setImage] = useState(null)

	const uploadImage = async () => {
		FileSystem.uploadAsync('https://lexta.pro/api/LoadingProfileImage.php', image, {
			uploadType: FileSystem.FileSystemUploadType.MULTIPART,
			fieldName: 'LoadProfileImg',
			parameters: {
				user: md5(store.getState().reducerUser.Email),
				token: store.getState().reducerUser.Token,
			},
		}).then((res) => console.log(JSON.parse(res.body)))
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.cancelled) {
			setImage(result.uri)
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
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. A eum eius
								maxime nobis beatae nulla labore debitis eligendi quam voluptatum in
								laboriosam enim, odio inventore, blanditiis unde nemo autem
								accusantium.
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
				<View style={styles.mainBody}>
					<TouchableOpacity
						style={styles.buttonStyle}
						activeOpacity={0.5}
						onPress={pickImage}
					>
						<Text style={styles.buttonTextStyle}>Select File</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonStyle}
						activeOpacity={0.5}
						onPress={uploadImage}
					>
						<Text style={styles.buttonTextStyle}>Upload File</Text>
					</TouchableOpacity>
				</View>
			</View>
			{image ? (
				<View>
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
				</View>
			) : null}
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
		marginLeft: 35,
		marginRight: 35,
		marginTop: 15,
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
