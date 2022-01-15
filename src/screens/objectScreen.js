import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Dimensions, View, Text, Modal, Pressable, TextInput, TouchableOpacity, Animated } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppDetails from '../components/AppDetails'
import AppEgrn from '../components/AppEgrn'
import ObjectParams from '../components/ObjectParams'
import ObjectMini from '../components/ObjectMini'
import { WebView } from 'react-native-webview'
import PhoneShow from '../components/PhoneShow'
import ObjectCarousel from '../components/ObjectCarousel'
import { numSplit } from '../components/scripts'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from '../store'

import { connect } from 'react-redux'
import LextaService from '../services/LextaService'
import MapMark from '../components/MapMark'
import { colors, fonts } from '../styles/constants'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const ObjectScreen = ({ route, navigation, state }) => {
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

	const [message, setMessage] = useState('')
	const messageFormData = new FormData()
	messageFormData.append('cc', 10)
	messageFormData.append('sub', 28)
	messageFormData.append('catalogue', 1)
	messageFormData.append('posting', 1)
	messageFormData.append('f_Checked', 1)
	// messageFormData.append('uid', store.getState().reducerUser.UserId)
	messageFormData.append('f_ToUserID', User_ID)
	messageFormData.append('f_Subject', `${Category}, ${TotalArea} м2`)
	messageFormData.append('f_Message', message)

	const handleSendMessage = async () => {
		console.log(messageFormData)
		const lexta = new LextaService()
		lexta
			.sendMessage(message)
			.then((res) => {
				console.log(res.status)
				return res.text()
			})
			.then((json) => console.log(json))
			.then(() => setModal(false))
			.catch((err) => console.log(err))
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
								fontFamily: 'gothampro-regular',
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
									fontFamily: 'gothampro-bold',
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
								<MaterialCommunityIcons name="update" color="#8f2d32" size={24} />
								<TouchableOpacity
									android_ripple
									onPress={() => {
										handleOpacityMainDown()
										setModal(true)
									}}
								>
									<MaterialCommunityIcons name="email-outline" color="#8f2d32" size={24} />
								</TouchableOpacity>
								<MaterialCommunityIcons name="forum-outline" color="#8f2d32" size={24} />
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
							<ObjectParams type="Квартира" value={`${NumberRooms}-комн`} />
							<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
							<ObjectParams type="Площадь" value={`${TotalArea} м2`} />
							<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
							<ObjectParams type="Кухня" value={`${KitchenArea} м2`} />
							<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
							<ObjectParams type="Этаж" value={Floor} />
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
								Описание
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
								Квартира
							</Text>
							<AppDetails label="Количство комнат" value={NumberRooms} />
							<AppDetails label="Общая площадь" value={`${TotalArea} м2`} />
							<AppDetails label="Жилая площадь" value={`${LivingArea} м2`} />
							<AppDetails label="Кухня" value={`${KitchenArea} м2`} />
							<AppDetails label="Этаж" value={`${Floor} м2`} />
							<AppDetails label="Тип дома" value={HouseType} />
							<AppDetails label="Ремонт" value={Finishing} />
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
								Информация об объекте из ЕГРН по данным собственника
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 10,
									color: '#7e7e7e',
									marginBottom: 10,
								}}
							>
								Кадастровый номер: {CadastralNumber}
							</Text>
							<AppEgrn value="1 собственник" />
							<AppEgrn value="Указана кадастровая стоимость" />
							<AppEgrn value="Параметры квартиры совпадают с данными ЕГРН" />
							<AppEgrn value="Ограничения не найдены" />
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
								{Street}, д.{HouseNumber}
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
								{mapMark ? 'Убрать карту' : 'Показать на карте'}
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
							Похожие объявления рядом
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
								Показать другие похожие
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
											{Category}, {TotalArea} м2
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
									placeholder="Сообщение владельцу"
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
										Отправить
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
