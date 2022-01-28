import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Text, View, StyleSheet, FlatList, ActivityIndicator, Animated } from 'react-native'
import { useSelector } from 'react-redux'
import LextaService from '../services/LextaService'
import md5 from 'md5'
import { colors, fonts } from '../styles/constants'
import Header from '../components/Header'

const lexta = new LextaService()
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default MessageScreen = ({ route, navigation }) => {
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
						color: '#000',
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

	const scrollY = React.useRef(new Animated.Value(0)).current

	return (
		<Fragment>
			{route.name === 'messagesTab' && <Header navigation={navigation} scrollY={scrollY} />}
			<View
				style={{
					flex: 1,
					backgroundColor: '#fff',
					alignItems: 'center',
					paddingTop: 10,
				}}
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
