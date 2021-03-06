import React, { useEffect, useRef, useState } from 'react'
import {
	ScrollView,
	Dimensions,
	View,
	Text,
	Modal,
	Pressable,
	TextInput,
	TouchableOpacity,
	Animated,
	ActivityIndicator,
	ToastAndroid,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppDetails from '../components/AppDetails'
import AppEgrn from '../components/AppEgrn'
import ObjectParams from '../components/ObjectParams'
import ObjectMini from '../components/ObjectMini'
import PhoneShow from '../components/PhoneShow'
import ObjectCarousel from '../components/ObjectCarousel'
import { numSplit } from '../components/scripts'
import Icon from 'react-native-vector-icons/FontAwesome'

import { connect, useSelector } from 'react-redux'
import LextaService from '../services/LextaService'
import MapMark from '../components/MapMark'
import { colors, fonts } from '../styles/constants'
import md5 from 'md5'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const lexta = new LextaService()

const ObjectScreen = ({ route, navigation, state }) => {
	const authCookies = useSelector((state) => state.authCookies)

	const [modal, setModal] = useState(false)
	const [mapMark, setMapMark] = useState(false)

	const {
		Category,
		Price,
		NumberRooms,
		TotalArea,
		Floor,
		Street,
		KitchenArea,
		Description,
		CadastralNumber,
		LivingArea,
		HouseType,
		Finishing,
		HouseNumber,
		Date: date,
		Img,
		User_ID,
		Latitude,
		Longitude,
		Message_ID,
	} = route.params.item

	const scrollToTop = useRef(null)

	const opacityMain = useRef(new Animated.Value(1)).current

	const handleOpacityMainDown = () => {
		Animated.timing(opacityMain, {
			toValue: 0.2,
			duration: 500,
			useNativeDriver: true,
		}).start()
	}
	const handleOpacityMainUp = () => {
		Animated.timing(opacityMain, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start()
	}

	const handleSubscribeGet = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const { Email, Token, userId } = JSON.parse(userData)

		lexta
			.getSubscribePrice(Token, md5(Email))
			.then((res) => res.json())
			.then((json) => console.log('handleSubscribeGet', json))
	}

	const handleSubscribe = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const { Email, Token } = JSON.parse(userData)

		lexta
			.setSubscribePrice(md5(Email), Token, Message_ID, 'subscribe')
			.then((res) => res.json())
			.then((json) => {
				if (json.status) {
					ToastAndroid.show('???????????? ???????? ???????????? ?? ?????????? ??????????????????!', ToastAndroid.SHORT)
				} else {
					ToastAndroid.show('????????????! ???????????????????? ??????????.', ToastAndroid.SHORT)
				}
			})
	}

	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const handleSendMessage = async () => {
		setLoading(true)
		// AUTH COOKIE START --->
		let secondAuth = new FormData()
		secondAuth.append('AuthPhase', '1')
		secondAuth.append('REQUESTED_FROM', '/')
		secondAuth.append('REQUESTED_BY', 'GET')
		secondAuth.append('catalogue', '1')
		secondAuth.append('sub', '6')
		secondAuth.append('cc', '')
		secondAuth.append('AUTH_USER', authCookies.email)
		secondAuth.append('AUTH_PW', authCookies.password)

		fetch('https://lexta.pro/netcat/modules/auth/', {
			method: 'POST',
			body: secondAuth,
		})
		// AUTH COOKIE <--- END

		const userData = await AsyncStorage.getItem('userData')
		const { UserId } = JSON.parse(userData)

		const messageFormData = new FormData()
		messageFormData.append('cc', 10)
		messageFormData.append('sub', 28)
		messageFormData.append('catalogue', 1)
		messageFormData.append('posting', 1)
		messageFormData.append('f_Checked', 1)
		messageFormData.append('uid', UserId)
		messageFormData.append('f_ToUserID', User_ID)
		messageFormData.append('f_Subject', `${Category}, ${TotalArea} ??2`)
		messageFormData.append('f_Message', message)

		fetch('https://lexta.pro/netcat/modules/auth/', {
			method: 'POST',
			body: secondAuth,
		})
			.then((res) => res.ok)
			.then((ok) => {
				if (ok) {
					console.log(ok)
					console.log(messageFormData)
					let xhr = new XMLHttpRequest()
					xhr.open('POST', 'https://lexta.pro/netcat/add.php')
					xhr.setRequestHeader('Content-Type', 'multipart/form-data')
					xhr.send(messageFormData)
				}
			})
			.then(() => {
				setLoading(false)
				handleOpacityMainUp()
				setModal(false)
			})
	}

	return (
		<React.Fragment>
			<Animated.View style={{ opacity: opacityMain }}>
				<ScrollView ref={scrollToTop} scrollTo contentContainerStyle={{ backgroundColor: '#fff' }}>
					<View style={{ alignItems: 'center' }}>
						<ObjectCarousel imgArray={Img} />
						<View style={{ position: 'absolute', left: 20, top: 30 }}>
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<MaterialCommunityIcons name="arrow-left-thick" color="#fff" size={30} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ paddingHorizontal: 10 }}>
						{/* DATE */}
						<Text
							style={{
								fontFamily: fonts.regular,
								fontSize: 13,
								color: '#7e7e7e',
								marginTop: 25,
							}}
						>
							{date}
						</Text>
						{/* PRICE */}
						<View
							style={{
								paddingTop: 10,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Text
								style={{
									fontFamily: fonts.bold,
									fontSize: 20,
								}}
							>
								{numSplit(Price)} &#8381;
							</Text>
							<View
								style={{
									flexDirection: 'row',
									width: windowWidth / 3.4,
									justifyContent: 'space-between',
								}}
							>
								<MaterialCommunityIcons name="update" color="#ccc" size={24} />
								<TouchableOpacity android_ripple onPress={() => handleSubscribe()}>
									<MaterialCommunityIcons name="email-outline" color="#8f2d32" size={24} />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										handleOpacityMainDown()
										setModal(true)
									}}
								>
									<MaterialCommunityIcons name="forum-outline" color="#8f2d32" size={24} />
								</TouchableOpacity>
							</View>
						</View>
						{/* PARAMS */}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								paddingVertical: 20,
							}}
						>
							<ObjectParams type="????????????????" value={`${NumberRooms}`} />
							<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
							<ObjectParams type="??????????????" value={`${TotalArea} ??2`} />
							<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
							<ObjectParams type="??????????" value={`${KitchenArea} ??2`} />
							<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
							<ObjectParams type="????????" value={Floor} />
						</View>
						{/* DESCR */}
						<View>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View
									style={{
										position: 'absolute',
										width: '100%',
										height: 1,
										backgroundColor: '#d0d0d0',
										alignItems: 'center',
									}}
								></View>
								<MaterialCommunityIcons name="arrow-down-drop-circle" color="#d0d0d0" size={15} />
							</View>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 16,
									marginTop: 15,
								}}
							>
								????????????????
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									lineHeight: 15,
									fontSize: 13,
									marginTop: 15,
									marginBottom: 30,
								}}
							>
								{Description}
							</Text>
						</View>
						{/* APP DETAILS */}
						<View style={{ marginBottom: 30 }}>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View
									style={{
										position: 'absolute',
										width: '100%',
										height: 1,
										backgroundColor: '#d0d0d0',
										alignItems: 'center',
									}}
								></View>
								<MaterialCommunityIcons name="arrow-down-drop-circle" color="#d0d0d0" size={15} />
							</View>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 16,
									marginTop: 15,
								}}
							>
								????????????????
							</Text>
							<AppDetails label="?????????????????? ????????????" value={NumberRooms} />
							<AppDetails label="?????????? ??????????????" value={`${TotalArea} ??2`} />
							<AppDetails label="?????????? ??????????????" value={`${LivingArea} ??2`} />
							<AppDetails label="??????????" value={`${KitchenArea} ??2`} />
							<AppDetails label="????????" value={`${Floor} ??2`} />
							<AppDetails label="?????? ????????" value={HouseType} />
							<AppDetails label="????????????" value={Finishing} />
						</View>
						{/* EGRN */}
						<View style={{ marginBottom: 30 }}>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View
									style={{
										position: 'absolute',
										width: '100%',
										height: 1,
										backgroundColor: '#d0d0d0',
										alignItems: 'center',
									}}
								></View>
								<MaterialCommunityIcons name="arrow-down-drop-circle" color="#d0d0d0" size={15} />
							</View>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 10,
									marginTop: 15,
								}}
							>
								???????????????????? ???? ?????????????? ???? ???????? ???? ???????????? ????????????????????????
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 10,
									color: '#7e7e7e',
									marginBottom: 10,
								}}
							>
								?????????????????????? ??????????: {CadastralNumber}
							</Text>
							<AppEgrn value="1 ??????????????????????" />
							<AppEgrn value="?????????????? ?????????????????????? ??????????????????" />
							<AppEgrn value="?????????????????? ???????????????? ?????????????????? ?? ?????????????? ????????" />
							<AppEgrn value="?????????????????????? ???? ??????????????" />
						</View>
						{/* MAP */}
						<View>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View
									style={{
										position: 'absolute',
										width: '100%',
										height: 1,
										backgroundColor: '#d0d0d0',
										alignItems: 'center',
									}}
								></View>
								<MaterialCommunityIcons name="arrow-down-drop-circle" color="#d0d0d0" size={15} />
							</View>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 12,
									marginTop: 15,
									marginBottom: 15,
								}}
							>
								{Street}, ??.{HouseNumber}
							</Text>
						</View>
					</View>

					<View style={{ alignItems: 'center', marginBottom: 20 }}>
						<Pressable
							android_ripple={{ color: '#fff' }}
							style={{
								backgroundColor: '#912e33',
								width: windowWidth * 0.94,
								height: windowWidth * 0.1,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => setMapMark(!mapMark)}
						>
							<Text
								style={{
									color: '#fdfffc',
									fontFamily: 'gothampro-regular',
									fontSize: 13,
								}}
							>
								{mapMark ? '???????????? ??????????' : '???????????????? ???? ??????????'}
							</Text>
						</Pressable>
					</View>

					{mapMark ? (
						<View style={{ width: windowWidth, height: windowWidth * 0.5, marginBottom: 30 }}>
							<MapMark reverse latitude={Latitude} longtitude={Longitude} />
						</View>
					) : null}

					{/* PHONE */}
					<PhoneShow />
					{/* <View style={{ paddingHorizontal: 10 }}>
						<Text
							style={{
								fontFamily: 'gothampro-bold',
								fontSize: 16,
								marginTop: 15,
							}}
						>
							?????????????? ???????????????????? ??????????
						</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 10,
								marginBottom: 10,
							}}
						>
							<ObjectMini
								toTop={scrollToTop.current && scrollToTop.current.scrollTo}
								item={state.reducerObjects[2]}
								navigation={navigation}
							/>
							<ObjectMini
								toTop={scrollToTop.current && scrollToTop.current.scrollTo}
								item={state.reducerObjects[3]}
								navigation={navigation}
							/>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 10,
								marginBottom: 10,
							}}
						>
							<ObjectMini
								toTop={scrollToTop.current && scrollToTop.current.scrollTo}
								item={state.reducerObjects[4]}
								navigation={navigation}
							/>
							<ObjectMini
								toTop={scrollToTop.current && scrollToTop.current.scrollTo}
								item={state.reducerObjects[5]}
								navigation={navigation}
							/>
						</View>
					</View> */}
					{/* <TouchableOpacity style={{ alignItems: 'center' }}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								width: windowWidth * 0.9,
								height: windowWidth * 0.1,
								borderRadius: 5,
								borderWidth: 1,
								borderColor: '#868686',
								marginBottom: 20,
							}}
						>
							<Text
								style={{
									color: '#fdfffc',
									fontFamily: 'gothampro-regular',
									fontSize: 13,
									color: '#868686',
								}}
							>
								???????????????? ???????????? ??????????????
							</Text>
						</View>
					</TouchableOpacity> */}
				</ScrollView>
			</Animated.View>

			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modal}
					onRequestClose={() => {
						handleOpacityMainUp()
						setModal(false)
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								alignItems: 'center',
								backgroundColor: '#fff',
								paddingTop: 20,
								// paddingBottom: 10,
								width: windowWidth * 0.9,
								elevation: 5,
								borderRadius: 10,
							}}
						>
							<View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<View style={{ width: '80%' }}>
										<Text style={{ fontFamily: 'gothampro-bold', fontSize: 20 }}>
											{Category}, {TotalArea} ??2
										</Text>
									</View>
									<View>
										<Icon
											name="times-circle"
											color={'#912e33'}
											size={25}
											onPress={() => {
												handleOpacityMainUp()
												setModal(false)
											}}
										/>
									</View>
								</View>
								<TextInput
									multiline
									value={message}
									onChangeText={(input) => setMessage(input)}
									style={{
										fontFamily: 'gothampro-regular',
										borderWidth: 1,
										borderRadius: 5,
										width: windowWidth * 0.8,
										height: windowHeight * 0.2,
										padding: 10,
										textAlignVertical: 'top',
										marginTop: 10,
									}}
									placeholder="?????????????????? ??????????????????"
								/>
							</View>

							<Pressable onPress={() => handleSendMessage()}>
								<View
									style={{
										paddingVertical: 5,
										paddingHorizontal: 10,
										backgroundColor: '#912e33',
										borderRadius: 10,
										marginVertical: 10,
									}}
								>
									<Text
										style={{
											fontFamily: 'gothampro-regular',
											color: '#fff',
											fontSize: 20,
										}}
									>
										{loading ? <ActivityIndicator color="#fff" /> : '??????????????????'}
									</Text>
								</View>
							</Pressable>
						</View>
					</View>
				</Modal>
			</View>
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
export default connect(mapStateToProps)(ObjectScreen)
