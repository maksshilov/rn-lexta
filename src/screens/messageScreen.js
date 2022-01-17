import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, Button, Dimensions, ScrollView, Text, View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import { connect, useSelector } from 'react-redux'
import LextaService from '../services/LextaService'
import md5 from 'md5'
import { colors, fonts } from '../styles/constants'
// import { getDocumentAsync } from 'expo-document-picker'
// import * as ImagePicker from 'expo-image-picker'
// import RNFetchBlob from 'rn-fetch-blob'
// import * as FileSystem from 'expo-file-system'
// import { launchImageLibrary } from 'react-native-image-picker'
// import { ncAuthAddObj, ncAuthAddObjXML, ncAuthFetch } from '../ncAuth'

const lexta = new LextaService()
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const MessageScreen = ({ route }) => {
	const [loading, setLoading] = useState(true)
	const [messagesType, setMessagesType] = useState(0)

	const { Email } = useSelector((state) => state.profile)
	const { token } = useSelector((state) => state.auth)

	const [dataSource, setDataSource] = useState([])
	const handleGetMessages = async (outbox = '0') => {
		setLoading(true)
		lexta
			.getMessages(md5(Email), token, outbox)
			.then((res) => res.json())
			.then((json) => {
				if (json[0] === undefined && json.Message === 'auth error') {
					console.log('AUTH_ERROR')
				} else {
					setDataSource(json)
				}
			})
			.then(() => setLoading(false))
			.catch((err) => console.error(err))
	}

	const renderItem = ({ item }) => (
		// 		"Created": "2021-11-03 22:52:59",
		//     "Email": "zxc@zxc.zxc",
		//     "Message": "blablabla",
		//     "Message_ID": "9",
		//     "Status": "0",
		//     "Subject": "Нижегородская область, Нижний Новгород, р-н Советский, 50, Дома, 158,7 м2, 158.7 м2",
		//     "ToUserID": "23",
		//     "User_ID": "16",
		<View style={{ width: windowWidth * 0.9, marginVertical: 10 }}>
			<View
				style={{
					backgroundColor: colors.red,
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
						fontFamily: fonts.bold,
						color: '#fff',
						fontSize: 12,
						lineHeight: 15,
					}}
				>
					{item.Subject}
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
						fontFamily: fonts.regular,
						color: '#000',
						fontSize: 12,
						lineHeight: 15,
					}}
				>
					{item.Message}
				</Text>
			</View>
			<View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
				<Text
					style={{
						fontFamily: fonts.regular,
						color: '#999',
						fontSize: 10,
						lineHeight: 15,
					}}
				>
					{item.Created}
				</Text>
			</View>
		</View>
	)

	useEffect(() => {
		handleGetMessages()
	}, [])

	return (
		<Fragment>
			<View
				style={[
					{
						flex: 1,
						backgroundColor: '#fff',
						alignItems: 'center',
					},
					route.name === 'messagesTab'
						? {
								paddingTop: 50,
						  }
						: {
								paddingTop: 10,
						  },
				]}
			>
				<View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 10 }}>
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

				{loading ? (
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<ActivityIndicator color={colors.red} size="large" />
					</View>
				) : dataSource.length ? (
					<FlatList data={dataSource} renderItem={renderItem} keyExtractor={(item) => item.Message_ID}></FlatList>
				) : (
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Text style={{ fontFamily: fonts.bold }}>{messagesType ? 'Исходящих' : 'Входящих'} сообщений нет</Text>
					</View>
				)}
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
