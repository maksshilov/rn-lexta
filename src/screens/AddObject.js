import React, { Fragment, useEffect, useRef, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker'
import {
	Dimensions,
	TextInput,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Animated,
} from 'react-native'
import store from '../store'
import md5 from 'md5'
import LextaService from '../services/LextaService'
// import { TextInput } from 'react-native-paper'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function AddObject() {
	const [f_Name, setf_Name] = useState('')
	const [f_Description, setf_Description] = useState('')
	const [f_Type, setf_Type] = useState('0')
	const [f_LeaseType, setf_LeaseType] = useState('0')
	const [f_TravelType, setf_TravelType] = useState('0')
	const [f_Region, setf_Region] = useState('')
	const [f_City, setf_City] = useState('')
	const [f_ObjectType, setf_ObjectType] = useState('0')
	const [f_Category, setf_Category] = useState('0')
	const [f_NumberRooms, setf_NumberRooms] = useState('0')
	const [f_TypeProperty, setf_TypeProperty] = useState('')
	const [f_SubwayStation, setf_SubwayStation] = useState('')
	const [f_Street, setf_Street] = useState('')
	const [f_HouseNumber, setf_HouseNumber] = useState('')
	const [f_Price, setf_Price] = useState('')
	const [f_PriceHistory, setf_PriceHistory] = useState('')
	const [f_Finishing, setf_Finishing] = useState('0')
	const [f_TotalArea, setf_TotalArea] = useState('')
	const [f_KitchenArea, setf_KitchenArea] = useState('')
	const [f_LivingArea, setf_LivingArea] = useState()
	const [f_Floor, setf_Floor] = useState('')
	const [f_FloorsInHouse, setf_FloorsInHouse] = useState('')
	const [f_FirstFloorType, setf_FirstFloorType] = useState('')
	const [f_HouseType, setf_HouseType] = useState('')
	const [f_Bathroom, setf_Bathroom] = useState('0')
	const [f_Window, setf_Window] = useState('0')
	const [f_BalconyType, setf_BalconyType] = useState('0')
	const [f_Elevator, setf_Elevator] = useState('0')
	const [f_Parking, setf_Parking] = useState('0')
	const [f_TypeSale, setf_TypeSale] = useState('0')
	const [f_OfferFrom, setf_OfferFrom] = useState('0')
	const [f_YearBuilt, setf_YearBuilt] = useState('')
	const [f_Mortgage, setf_Mortgage] = useState('')
	const [f_Video, setf_Video] = useState('')
	const [f_Phone, setf_Phone] = useState('')
	const [f_CadastralNumber, setf_CadastralNumber] = useState('')
	const [f_Img, setf_Img] = useState('')
	const [f_Latitude, setf_Latitude] = useState('0')
	const [f_Longitude, setf_Longitude] = useState('0')
	const [f_LandAppointment, setf_LandAppointment] = useState('0')
	const [f_LandElectricity, setf_LandElectricity] = useState('0')
	const [f_LandGas, setf_LandGas] = useState('0')
	const [f_LandWater, setf_LandWater] = useState('0')
	const [f_LandSewerage, setf_LandSewerage] = useState('0')
	const [f_LandArea, setf_LandArea] = useState('0')
	const [f_Carport, setf_Carport] = useState('0')
	const [f_ParkingLot, setf_ParkingLot] = useState('0')
	const [f_Garage, setf_Garage] = useState('0')
	const [f_Bath, setf_Bath] = useState('0')
	const [f_GardenHouse, setf_GardenHouse] = useState('0')
	const [f_HouseholdBuilding, setf_HouseholdBuilding] = useState('0')
	const [f_Facilities, setf_Facilities] = useState('0')
	const [f_CommercialPropertyType, setf_CommercialPropertyType] = useState('0')
	const [f_LocationCommercial, setf_LocationCommercial] = useState('0')
	const [f_LeasePricePeriod, setf_LeasePricePeriod] = useState('0')
	// f_ViewsNum - DON'T SEND
	// f_ObjectChecked - DON'T SEND
	// f_ObjectRejected - DON'T SEND
	// f_ObjectRejectedComment - DON'T SEND
	const [f_ViewsNum, setf_ViewsNum] = useState(0)
	const [f_ObjectChecked, setf_ObjectChecked] = useState(0)
	const [f_ObjectRejected, setf_ObjectRejected] = useState(0)
	const [f_ObjectRejectedComment, setf_ObjectRejectedComment] = useState('')

	let data = new FormData()
	data.append('cc', 6)
	data.append('sub', 10)
	data.append('posting', 1)
	data.append('f_Name', f_Name)
	data.append('f_Description', f_Description)
	data.append('f_Type', f_Type)
	data.append('f_LeaseType', f_LeaseType)
	data.append('f_TravelType', f_TravelType)
	data.append('f_Region', f_Region)
	data.append('f_City', f_City)
	data.append('f_ObjectType', f_ObjectType)
	data.append('f_Category', f_Category)
	data.append('f_NumberRooms', f_NumberRooms)
	data.append('f_TypeProperty', f_TypeProperty)
	data.append('f_SubwayStation', f_SubwayStation)
	data.append('f_Street', f_Street)
	data.append('f_HouseNumber', f_HouseNumber)
	data.append('f_Price', f_Price)
	data.append('f_PriceHistory', f_PriceHistory)
	data.append('f_Finishing', f_Finishing)
	data.append('f_TotalArea', f_TotalArea)
	data.append('f_KitchenArea', f_KitchenArea)
	data.append('f_LivingArea', f_LivingArea)
	data.append('f_Floor', f_Floor)
	data.append('f_FloorsInHouse', f_FloorsInHouse)
	data.append('f_FirstFloorType', f_FirstFloorType)
	data.append('f_HouseType', f_HouseType)
	data.append('f_Bathroom', f_Bathroom)
	data.append('f_Window', f_Window)
	data.append('f_BalconyType', f_BalconyType)
	data.append('f_Elevator', f_Elevator)
	data.append('f_Parking', f_Parking)
	data.append('f_TypeSale', f_TypeSale)
	data.append('f_OfferFrom', f_OfferFrom)
	data.append('f_YearBuilt', f_YearBuilt)
	data.append('f_Mortgage', f_Mortgage)
	data.append('f_Video', f_Video)
	data.append('f_Phone', f_Phone)
	data.append('f_CadastralNumber', f_CadastralNumber)
	// data.append('f_Img', f_Img)
	data.append('f_Latitude', f_Latitude)
	data.append('f_Longitude', f_Longitude)
	data.append('f_LandAppointment', f_LandAppointment)
	data.append('f_LandElectricity', f_LandElectricity)
	data.append('f_LandGas', f_LandGas)
	data.append('f_LandWater', f_LandWater)
	data.append('f_LandSewerage', f_LandSewerage)
	data.append('f_LandArea', f_LandArea)
	data.append('f_Carport', f_Carport)
	data.append('f_ParkingLot', f_ParkingLot)
	data.append('f_Garage', f_Garage)
	data.append('f_Bath', f_Bath)
	data.append('f_GardenHouse', f_GardenHouse)
	data.append('f_HouseholdBuilding', f_HouseholdBuilding)
	data.append('f_Facilities', f_Facilities)
	data.append('f_CommercialPropertyType', f_CommercialPropertyType)
	data.append('f_LocationCommercial', f_LocationCommercial)
	data.append('f_LeasePricePeriod', f_LeasePricePeriod)
	data.append('f_ViewsNum', f_ViewsNum)
	data.append('f_ObjectChecked', f_ObjectChecked)
	data.append('f_ObjectRejected', f_ObjectRejected)
	data.append('f_ObjectRejectedComment', f_ObjectRejectedComment)

	const handleAddObject = async () => {
		console.log('handleAddObject')

		await fetch('https://lexta.pro/netcat/add.php', {
			method: 'post',
			mode: 'no-cors',
			headers: new Headers(),
			body: data,
		})
			.then((res) => {
				console.log(res.status)
				return res.text()
			})
			.then((json) => console.log('json', json))
			.catch((err) => console.log(err))
	}

	const fadeLeaseType = useRef(new Animated.Value(0)).current
	useEffect(() => {
		if (f_Category <= 6 && f_Type === '1') {
			Animated.timing(fadeLeaseType, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start()
		} else {
			Animated.timing(fadeLeaseType, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start()
		}
	}, [f_Type])

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView
				contentContainerStyle={{
					paddingTop: 10,
					paddingBottom: 25,
					backgroundColor: '#fff',
					alignItems: 'center',
				}}
				style={{ width: windowWidth }}
			>
				<View>
					{/* F_CATEGORY */}
					<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
						<Text style={styles.title}>Категория</Text>
						<View
							style={[
								{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								},
								f_Category !== '0'
									? { backgroundColor: '#acacac' }
									: { backgroundColor: '#fff' },
							]}
						>
							<Picker
								style={{
									fontFamily: 'gothampro-regular',
									fontWeight: 'normal',
									height: windowWidth * 0.1,
								}}
								selectedValue={f_Category}
								onValueChange={(value) => {
									setf_Category(value)
									switch (value) {
										case '1':
											setf_Name(`Комнаты, ${f_TotalArea} м2`)

											break
										case '2':
											setf_Name(`Квартиры, ${f_TotalArea} м2`)

											break
										case '3':
											setf_Name(`Дачи, ${f_TotalArea} м2`)

											break
										case '4':
											setf_Name(`Дома, ${f_TotalArea} м2`)

											break
										case '5':
											setf_Name(`Коттеджи, ${f_TotalArea} м2`)

											break
										case '6':
											setf_Name(`Таунхаусы, ${f_TotalArea} м2`)

											break
										case '7':
											setf_Name(`Земельный участок, ${f_TotalArea} м2`)

											break
										case '8':
											setf_Name(`Гараж, ${f_TotalArea} м2`)

											break
										case '9':
											setf_Name(`Подвал, ${f_TotalArea} м2`)

											break
										case '10':
											setf_Name(`Машиноместо, ${f_TotalArea} м2`)

											break
										case '11':
											setf_Name(`Погреб (овощехранилище), ${f_TotalArea} м2`)

											break
										case '12':
											setf_Name(
												`Коммерческая недвижимость, ${f_TotalArea} м2`
											)
											break
										default:
											setf_Name(`не выбрано, ${f_TotalArea} м2`)
											break
									}
								}}
							>
								<Picker.Item label="-- выбрать --" value="0" />
								<Picker.Item label="Комнаты" value="1" />
								<Picker.Item label="Квартиры" value="2" />
								<Picker.Item label="Дачи" value="3" />
								<Picker.Item label="Дома" value="4" />
								<Picker.Item label="Коттеджи" value="5" />
								<Picker.Item label="Таунхаусы" value="6" />
								<Picker.Item label="Земельный участок" value="7" />
								<Picker.Item label="Гараж" value="8" />
								<Picker.Item label="Подвал" value="9" />
								<Picker.Item label="Машиноместо" value="10" />
								<Picker.Item label="Погреб (овощехранилище)" value="11" />
								<Picker.Item label="Коммерческая недвижимость" value="12" />
							</Picker>
						</View>
					</View>

					{/* F_LANDAPPOINTMENT */}
					{f_Category == 7 ? (
						<View style={{ width: windowWidth * 0.94 }}>
							<Text style={styles.title}>Назначение</Text>
							<View
								style={[
									{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
										marginBottom: 20,
									},
									f_LandAppointment !== '0'
										? { backgroundColor: '#acacac' }
										: { backgroundColor: '#fff' },
								]}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_LandAppointment}
									onValueChange={(itemValue) => setf_LandAppointment(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="ИЖС" value="1" />
									<Picker.Item label="СНТ (ДНТ)" value="2" />
									<Picker.Item label="Промышленные" value="3" />
									<Picker.Item label="Рекреационные" value="4" />
									<Picker.Item label="Лесфонда" value="5" />
								</Picker>
							</View>
						</View>
					) : null}

					{/* F_TYPE */}
					{f_Category == 0 ? null : (
						<View style={{ width: windowWidth * 0.94 }}>
							<Text style={styles.title}>Тип сделки</Text>
							<View
								style={[
									{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
										marginBottom: 20,
									},
									f_Type !== '0'
										? { backgroundColor: '#acacac' }
										: { backgroundColor: '#fff' },
								]}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_Type}
									onValueChange={(itemValue) => setf_Type(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Аренда" value="1" />
									<Picker.Item label="Продажа" value="2" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_LEASETYPE */}
					{f_Category == 0 ? null : f_Category >= 7 ? null : f_Type === '1' ? (
						<View
							style={{
								width: windowWidth * 0.94,
							}}
						>
							<Text style={styles.title}>Тип аренды</Text>
							<View
								style={[
									{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
										marginBottom: 20,
									},
									f_LeaseType !== '0'
										? { backgroundColor: '#acacac' }
										: { backgroundColor: '#fff' },
								]}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_LeaseType}
									onValueChange={(itemValue) => setf_LeaseType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Длительная" value="1" />
									<Picker.Item label="Посуточная" value="2" />
								</Picker>
							</View>
						</View>
					) : null}

					{/* F_COMMERCIALPROPERTYTYPE */}
					{f_Category == 0 && !f_Type ? null : f_Category == 12 ? (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Тип коммерческой недвижимости</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_CommercialPropertyType}
									onValueChange={(itemValue) =>
										setf_CommercialPropertyType(itemValue)
									}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Офисное помещение" value="1" />
									<Picker.Item label="Свободного назначения" value="2" />
									<Picker.Item label="Торговая" value="3" />
									<Picker.Item label="Складская" value="4" />
									<Picker.Item label="Общественное питание" value="5" />
									<Picker.Item label="Гостиница" value="6" />
									<Picker.Item label="Автосервис / СТО" value="7" />
									<Picker.Item label="Отдельно стоящее здание" value="8" />
									<Picker.Item label="Комплексы" value="9" />
								</Picker>
							</View>
						</View>
					) : null}

					{/* F_LOCATIONCOMMERCIAL */}
					{f_Category == 0 ? null : f_Category == 12 ? (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Расположение ком. недвижимости</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_LocationCommercial}
									onValueChange={(itemValue) =>
										setf_LocationCommercial(itemValue)
									}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="В жилом доме" value="1" />
									<Picker.Item label="В БЦ/ТЦ/ДЦ" value="2" />
									<Picker.Item label="Иное" value="3" />
								</Picker>
							</View>
						</View>
					) : null}

					{/* F_OBJECTTYPE */}
					{f_Category == 0 || f_Type == 0 ? null : f_Category >= 7 ? null : (
						<View style={{ flexDirection: 'row' }}>
							<Pressable
								onPress={() => setf_ObjectType(1)}
								style={[
									styles.select,
									{
										width: windowWidth * 0.47,
										height: windowWidth * 0.1,
										borderTopLeftRadius: 10,
										borderBottomLeftRadius: 10,
										borderTopWidth: 1,
										borderBottomWidth: 1,
									},
									f_ObjectType === 1 ? styles.selected : null,
								]}
							>
								<Text
									style={[
										styles.selectText,
										f_ObjectType === 1 ? styles.selectedText : null,
									]}
								>
									Новостройка
								</Text>
							</Pressable>
							<Pressable
								onPress={() => setf_ObjectType(2)}
								style={[
									styles.select,
									{
										width: windowWidth * 0.47,
										height: windowWidth * 0.1,
										borderTopRightRadius: 10,
										borderBottomRightRadius: 10,
										borderStartWidth: 0,
									},
									f_ObjectType === 2 ? styles.selected : null,
								]}
							>
								<Text
									style={[
										styles.selectText,
										f_ObjectType === 2 ? styles.selectedText : null,
									]}
								>
									Вторичка
								</Text>
							</Pressable>
						</View>
					)}

					{/* F_TRAVELTYPE */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category >=
					  7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Тип туристического объекта</Text>
							<View
								style={[
									{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
									},
									f_TravelType !== '0'
										? { backgroundColor: '#acacac' }
										: { backgroundColor: '#fff' },
								]}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_TravelType}
									onValueChange={(itemValue) => setf_TravelType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Турбаза" value="1" />
									<Picker.Item label="Отель" value="2" />
									<Picker.Item label="Гостиница" value="3" />
									<Picker.Item label="База отдыха" value="4" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_NUMBERROOMS */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category == 1 ||
					  f_Category >= 7 ? null : (
						<View style={{ marginBottom: 20 }}>
							<Text style={styles.title}>Количество комнат</Text>
							<View
								style={[
									{
										flexDirection: 'row',
										width: windowWidth * 0.94,
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,

										borderColor: '#868686',
									},
									f_NumberRooms !== '0'
										? { backgroundColor: '#acacac' }
										: { backgroundColor: '#fff' },
								]}
							>
								<Picker
									style={{
										width: windowWidth * 0.94,
										height: windowWidth * 0.1,
									}}
									selectedValue={f_NumberRooms}
									onValueChange={(itemValue) => setf_NumberRooms(itemValue)}
								>
									<Picker.Item label="-- не выбрано --" value="0" />
									<Picker.Item label="1 комната" value="1" />
									<Picker.Item label="2 комнаты" value="2" />
									<Picker.Item label="3 комнаты" value="3" />
									<Picker.Item label="4 комнаты" value="4" />
									<Picker.Item label="5 комнат" value="5" />
									<Picker.Item label="6 комнат" value="6" />
									<Picker.Item label="7 комнат" value="7" />
								</Picker>
							</View>
						</View>
					)}

					{/* REGION & CITY */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ? null : (
						<View style={{ flexDirection: 'row', marginBottom: 20 }}>
							<View style={{ width: windowWidth * 0.47 }}>
								<Text style={styles.title}>Регион</Text>
								<TextInput
									value={f_Region}
									onChangeText={(value) => setf_Region(value)}
									placeholder="Регион"
									keyboardType="default"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.47,
										height: windowWidth * 0.1,
										borderRadius: 10,
										borderTopRightRadius: 0,
										borderBottomRightRadius: 0,
									}}
								/>
							</View>
							<View style={{ width: windowWidth * 0.47 }}>
								<Text style={styles.title}>Город</Text>
								<TextInput
									value={f_City}
									onChangeText={(value) => setf_City(value)}
									placeholder="Город"
									keyboardType="default"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.47,
										height: windowWidth * 0.1,
										borderRadius: 10,
										borderTopLeftRadius: 0,
										borderBottomLeftRadius: 0,
										borderLeftWidth: 0,
									}}
								/>
							</View>
						</View>
					)}

					{/* F_STREET, F_HOUSENUMBER */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ? null : (
						<View style={{ flexDirection: 'row', marginBottom: 20 }}>
							<View style={{ width: windowWidth * 0.47 }}>
								<Text style={styles.title}>Улица</Text>
								<TextInput
									value={f_Street}
									onChangeText={(value) => setf_Street(value)}
									placeholder="Улица"
									keyboardType="default"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.47,
										height: windowWidth * 0.1,
										borderRadius: 10,
										borderTopRightRadius: 0,
										borderBottomRightRadius: 0,
									}}
								/>
							</View>
							<View style={{ width: windowWidth * 0.47 }}>
								<Text style={styles.title}>Номер дома</Text>
								<TextInput
									value={f_HouseNumber}
									onChangeText={(value) => setf_HouseNumber(value)}
									placeholder="Номер дома"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.47,
										height: windowWidth * 0.1,
										borderRadius: 10,
										borderTopLeftRadius: 0,
										borderBottomLeftRadius: 0,
										borderLeftWidth: 0,
									}}
								/>
							</View>
						</View>
					)}

					{/* PROPERTY TYPE */}
					{/* <View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.94 }}>
							<Text style={styles.title}>Тип недвижимости</Text>
							<TextInput
								value={f_TypeProperty}
								onChangeText={(value) => setf_TypeProperty(value)}
								placeholder="Тип недвижимости"
								keyboardType="default"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.94,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
					</View> */}

					{/* LOCATION */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ? null : (
						<View>
							<Text style={styles.title}>Метка на карте</Text>
							<View
								style={{
									width: windowWidth * 0.94,
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginBottom: 20,
								}}
							>
								<TextInput
									// value={}
									// onChangeText={() => {}}
									placeholder="Широта, долгота"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.8,
										height: windowWidth * 0.1,
										borderRadius: 10,
									}}
								/>
								<Pressable
									android_ripple={{ color: '#fff' }}
									style={{
										backgroundColor: '#912e33',
										width: windowWidth * 0.1,
										height: windowWidth * 0.1,
										borderRadius: 10,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									onPress={() => {}}
								>
									<Text
										style={{
											color: '#fdfffc',
											fontFamily: 'gothampro-regular',
											fontSize: 18,
										}}
									>
										+
									</Text>
								</Pressable>
							</View>
						</View>
					)}

					{/* F_HOUSETYPE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ? null : f_Category >= 7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Тип дома</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_HouseType}
									onValueChange={(itemValue) => setf_HouseType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Кирпичный" value="1" />
									<Picker.Item label="Панельный" value="2" />
									<Picker.Item label="Деревянный" value="3" />
									<Picker.Item label="Монолитный" value="4" />
									<Picker.Item label="Монолитно кирпичный" value="5" />
									<Picker.Item label="Монолитно блочный" value="6" />
									<Picker.Item label="Сталинка" value="7" />
									<Picker.Item label="Блочный" value="8" />
								</Picker>
							</View>
						</View>
					)}

					{/* YEAR */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ? null : (
						<Fragment>
							<Text style={styles.title}>Год постройки</Text>
							<View style={{ flexDirection: 'row', marginBottom: 20 }}>
								<TextInput
									value={f_YearBuilt}
									onChangeText={(value) => setf_YearBuilt(value)}
									placeholder="Год постройки"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.94,
										height: windowWidth * 0.1,
										borderRadius: 10,
									}}
								/>
							</View>
						</Fragment>
					)}

					{/*  F_FLOOR */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ? null : f_Category >= 3 && f_Category <= 7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Этаж</Text>
							<TextInput
								value={f_Floor}
								onChangeText={(value) => setf_Floor(value)}
								placeholder="Этаж"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.94,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
					)}

					{/* F_FLOORSINHOUSE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ? null : f_Category >= 7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Этажей в доме</Text>
							<TextInput
								value={f_FloorsInHouse}
								onChangeText={(value) => setf_FloorsInHouse(value)}
								placeholder="Этажей в доме"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.94,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
					)}

					{/* F_FIRSTFLOORTYPE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ? null : f_Category >= 7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Тип первого этаж</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_FirstFloorType}
									onValueChange={(itemValue) => setf_FirstFloorType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Жилой" value="1" />
									<Picker.Item label="Нежилой" value="2" />
									<Picker.Item label="Частично нежилой" value="3" />
								</Picker>
							</View>
						</View>
					)}

					{/* AREA */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ? null : f_Category == 7 ? null : f_Category == 1 ||
					  f_Category >= 8 ? (
						<View>
							<Text style={{ ...styles.title, marginBottom: 5 }}>Площадь</Text>
							<View style={{ flexDirection: 'row', marginBottom: 20 }}>
								<View style={{ width: windowWidth * 0.47 }}>
									<Text style={styles.title}>Общая</Text>
									<TextInput
										value={f_TotalArea}
										onChangeText={(value) => {
											setf_TotalArea(value)
											switch (f_Category) {
												case '1':
													setf_Name(`Комнаты, ${value} м2`)

													break
												case '2':
													setf_Name(`Квартиры, ${value} м2`)

													break
												case '3':
													setf_Name(`Дачи, ${value} м2`)

													break
												case '4':
													setf_Name(`Дома, ${value} м2`)

													break
												case '5':
													setf_Name(`Коттеджи, ${value} м2`)

													break
												case '6':
													setf_Name(`Таунхаусы, ${value} м2`)

													break
												case '7':
													setf_Name(`Земельный участок, ${value} м2`)

													break
												case '8':
													setf_Name(`Гараж, ${value} м2`)

													break
												case '9':
													setf_Name(`Подвал, ${value} м2`)

													break
												case '10':
													setf_Name(`Машиноместо, ${value} м2`)

													break
												case '11':
													setf_Name(
														`Погреб (овощехранилище), ${value} м2`
													)

													break
												case '12':
													setf_Name(
														`Коммерческая недвижимость, ${value} м2`
													)

													break
												default:
													setf_Name(`не выбрано, ${value} м2`)

													break
											}
										}}
										placeholder="Общая"
										keyboardType="number-pad"
										style={{
											...styles.textInput,
											...styles.textInputInput,
											width: windowWidth * 0.47,
											height: windowWidth * 0.1,
											borderTopLeftRadius: 10,
											borderBottomLeftRadius: 10,
										}}
									/>
								</View>

								<View style={{ width: windowWidth * 0.47 }}>
									<Text style={styles.title}>Жилая</Text>
									<TextInput
										value={f_LivingArea}
										onChangeText={(value) => setf_LivingArea(value)}
										placeholder="Жилая"
										keyboardType="number-pad"
										style={{
											...styles.textInput,
											...styles.textInputInput,
											width: windowWidth * 0.47,
											height: windowWidth * 0.1,
											borderTopRightRadius: 10,
											borderBottomRightRadius: 10,
											borderLeftWidth: 0,
										}}
									/>
								</View>
							</View>
						</View>
					) : (
						<View>
							<Text style={{ ...styles.title, marginBottom: 5 }}>Площадь</Text>
							<View style={{ flexDirection: 'row', marginBottom: 20 }}>
								<View style={{ width: windowWidth * 0.31 }}>
									<Text style={styles.title}>Общая</Text>
									<TextInput
										value={f_TotalArea}
										onChangeText={(value) => {
											setf_TotalArea(value)
											switch (f_Category) {
												case '1':
													setf_Name(`Комнаты, ${value} м2`)

													break
												case '2':
													setf_Name(`Квартиры, ${value} м2`)

													break
												case '3':
													setf_Name(`Дачи, ${value} м2`)

													break
												case '4':
													setf_Name(`Дома, ${value} м2`)

													break
												case '5':
													setf_Name(`Коттеджи, ${value} м2`)

													break
												case '6':
													setf_Name(`Таунхаусы, ${value} м2`)

													break
												case '7':
													setf_Name(`Земельный участок, ${value} м2`)

													break
												case '8':
													setf_Name(`Гараж, ${value} м2`)

													break
												case '9':
													setf_Name(`Подвал, ${value} м2`)

													break
												case '10':
													setf_Name(`Машиноместо, ${value} м2`)

													break
												case '11':
													setf_Name(
														`Погреб (овощехранилище), ${value} м2`
													)

													break
												case '12':
													setf_Name(
														`Коммерческая недвижимость, ${value} м2`
													)

													break
												default:
													setf_Name(`не выбрано, ${value} м2`)

													break
											}
										}}
										placeholder="Общая"
										keyboardType="number-pad"
										style={{
											...styles.textInput,
											...styles.textInputInput,
											width: windowWidth * 0.31,
											height: windowWidth * 0.1,
											borderTopLeftRadius: 10,
											borderBottomLeftRadius: 10,
										}}
									/>
								</View>
								<View style={{ width: windowWidth * 0.32 }}>
									<Text style={styles.title}>Кухни</Text>
									<TextInput
										value={f_KitchenArea}
										onChangeText={(value) => setf_KitchenArea(value)}
										placeholder="Кухни"
										keyboardType="number-pad"
										style={{
											...styles.textInput,
											...styles.textInputInput,
											width: windowWidth * 0.32,
											height: windowWidth * 0.1,
											borderWidth: 0,
											borderTopWidth: 1,
											borderBottomWidth: 1,
										}}
									/>
								</View>
								<View style={{ width: windowWidth * 0.31 }}>
									<Text style={styles.title}>Жилая</Text>
									<TextInput
										value={f_LivingArea}
										onChangeText={(value) => setf_LivingArea(value)}
										placeholder="Жилая"
										keyboardType="number-pad"
										style={{
											...styles.textInput,
											...styles.textInputInput,
											width: windowWidth * 0.31,
											height: windowWidth * 0.1,
											borderTopRightRadius: 10,
											borderBottomRightRadius: 10,
										}}
									/>
								</View>
							</View>
						</View>
					)}

					{/* F_FINISHING */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ? null : f_Category >= 7 ? null : (
						<View style={{ flexDirection: 'row', marginBottom: 20 }}>
							<View style={{ width: windowWidth * 0.94, paddingRight: 3 }}>
								<Text style={styles.title}>Отделка</Text>
								<View
									style={{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
									}}
								>
									<Picker
										style={{
											fontFamily: 'gothampro-regular',
											fontWeight: 'normal',
											height: windowWidth * 0.1,
										}}
										selectedValue={f_Finishing}
										onValueChange={(itemValue) => setf_Finishing(itemValue)}
									>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="С отделкой" value="1" />
										<Picker.Item label="Без отделки" value="2" />
										<Picker.Item label="Частично" value="3" />
										<Picker.Item label="WhiteBox" value="4" />
									</Picker>
								</View>
							</View>
						</View>
					)}

					{/* F_BATHROOM  */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ? null : f_Category === '1' || f_Category >= 7 ? null : (
						<View style={{ flexDirection: 'row', marginBottom: 20 }}>
							<View style={{ width: windowWidth * 0.94 }}>
								<Text style={styles.title}>Санузел</Text>
								<View
									style={{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
									}}
								>
									<Picker
										style={{
											fontFamily: 'gothampro-regular',
											fontWeight: 'normal',
											height: windowWidth * 0.1,
										}}
										selectedValue={f_Bathroom}
										onValueChange={(itemValue) => setf_Bathroom(itemValue)}
									>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Совмещенный" value="1" />
										<Picker.Item label="Раздельный" value="2" />
										<Picker.Item label="На этаже" value="3" />
										<Picker.Item label="В комнате" value="4" />
										<Picker.Item label="В блоке" value="5" />
									</Picker>
								</View>
							</View>
						</View>
					)}

					{/* F_WINDOW */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ? null : f_Category >= 7 ? null : (
						<View
							style={{ width: windowWidth * 0.94, paddingRight: 3, marginBottom: 20 }}
						>
							<Text style={styles.title}>Окна</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_Window}
									onValueChange={(itemValue) => setf_Window(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Во двор" value="1" />
									<Picker.Item label="На улицу" value="2" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_BALCONYTYPE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Тип балкона</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_BalconyType}
									onValueChange={(itemValue) => setf_BalconyType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Балкон" value="1" />
									<Picker.Item label="Лоджия" value="2" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_ELEVATOR */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Лифт</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_Elevator}
									onValueChange={(itemValue) => setf_Elevator(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Пассажирский" value="1" />
									<Picker.Item label="Грузовой" value="2" />
									<Picker.Item label="Пассажирский и грузовой" value="3" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_PARKING */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Парковка</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_Parking}
									onValueChange={(itemValue) => setf_Parking(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Наземная" value="1" />
									<Picker.Item label="Подземная" value="2" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_FACILITIES */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category === '1' ? (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Удобства</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_Facilities}
									onValueChange={(itemValue) => setf_Facilities(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="На этаже" value="1" />
									<Picker.Item label="В комнате" value="2" />
									<Picker.Item label="В блоке" value="3" />
								</Picker>
							</View>
						</View>
					) : null}

					{/* F_LANDELECTRICITY, F_LANDGAS, F_LANDWATER, F_LANDSEWERAGE, F_LANDAREA, F_CARPORT, F_PARKINGLOT, F_GARAGE, F_BATH, F_GARDENHOUSE, F_HOUSEHOLDBUILDING */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 3 && f_Category <= 7 ? (
						<Fragment>
							<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
								<Text style={styles.title}>Электричество</Text>
								<View
									style={{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
									}}
								>
									<Picker
										style={{
											fontFamily: 'gothampro-regular',
											fontWeight: 'normal',
											height: windowWidth * 0.1,
										}}
										selectedValue={f_LandElectricity}
										onValueChange={(itemValue) =>
											setf_LandElectricity(itemValue)
										}
									>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Заведено" value="1" />
										<Picker.Item label="По границе" value="2" />
										<Picker.Item label="Имеется ТУ на подключение" value="3" />
									</Picker>
								</View>
							</View>

							<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
								<Text style={styles.title}>Газ</Text>
								<View
									style={{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
									}}
								>
									<Picker
										style={{
											fontFamily: 'gothampro-regular',
											fontWeight: 'normal',
											height: windowWidth * 0.1,
										}}
										selectedValue={f_LandGas}
										onValueChange={(itemValue) => setf_LandGas(itemValue)}
									>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Заведён" value="1" />
										<Picker.Item label="По границе" value="2" />
										<Picker.Item label="Имеется ТУ на подключение" value="3" />
									</Picker>
								</View>
							</View>

							<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
								<Text style={styles.title}>Водоснабжение</Text>
								<View
									style={{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
									}}
								>
									<Picker
										style={{
											fontFamily: 'gothampro-regular',
											fontWeight: 'normal',
											height: windowWidth * 0.1,
										}}
										selectedValue={f_LandWater}
										onValueChange={(itemValue) => setf_LandWater(itemValue)}
									>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Колодец" value="1" />
										<Picker.Item label="Централизованное" value="2" />
										<Picker.Item label="Скважина" value="3" />
									</Picker>
								</View>
							</View>

							<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
								<Text style={styles.title}>Канализация</Text>
								<View
									style={{
										height: windowWidth * 0.1,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: '#868686',
									}}
								>
									<Picker
										style={{
											fontFamily: 'gothampro-regular',
											fontWeight: 'normal',
											height: windowWidth * 0.1,
										}}
										selectedValue={f_LandSewerage}
										onValueChange={(itemValue) => setf_LandSewerage(itemValue)}
									>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Централизованная" value="1" />
										<Picker.Item label="Септик" value="2" />
										<Picker.Item label="КНС" value="3" />
									</Picker>
								</View>
							</View>

							{f_Category >= 3 && f_Category <= 6 ? (
								<Fragment>
									<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
										<Text style={styles.title}>Площадь участка (соток)</Text>
										<TextInput
											value={f_LandArea}
											onChangeText={(value) => setf_LandArea(value)}
											placeholder="Площадь участка (соток)"
											keyboardType="number-pad"
											style={{
												...styles.textInput,
												...styles.textInputInput,
												width: windowWidth * 0.94,
												height: windowWidth * 0.1,
												borderRadius: 10,
											}}
										/>
									</View>

									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<Pressable
											onPress={() =>
												f_Carport === '0'
													? setf_Carport('1')
													: setf_Carport('0')
											}
											style={[
												styles.select,
												{
													width: windowWidth * 0.25,
													height: windowWidth * 0.15,
													borderWidth: 1,
													borderRadius: 10,
												},
												f_Carport === '1' ? styles.selected : null,
											]}
										>
											<Text
												style={[
													styles.selectText,
													{ textAlign: 'center', lineHeight: 20 },
													f_Carport === '1' ? styles.selectedText : null,
												]}
											>
												Навес{'\n'}для авто
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_ParkingLot === '0'
													? setf_ParkingLot('1')
													: setf_ParkingLot('0')
											}
											style={[
												styles.select,
												{
													width: windowWidth * 0.35,
													height: windowWidth * 0.15,
													borderWidth: 1,
													borderRadius: 10,
												},
												f_ParkingLot === '1' ? styles.selected : null,
											]}
										>
											<Text
												style={[
													styles.selectText,
													{ textAlign: 'center', lineHeight: 20 },
													f_ParkingLot === '1'
														? styles.selectedText
														: null,
												]}
											>
												Парковочное{'\n'}место
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_Garage === '0'
													? setf_Garage('1')
													: setf_Garage('0')
											}
											style={[
												styles.select,
												{
													width: windowWidth * 0.25,
													height: windowWidth * 0.15,
													borderWidth: 1,
													borderRadius: 10,
												},
												f_Garage === '1' ? styles.selected : null,
											]}
										>
											<Text
												style={[
													styles.selectText,
													{ textAlign: 'center', lineHeight: 20 },
													f_Garage === '1' ? styles.selectedText : null,
												]}
											>
												Гараж
											</Text>
										</Pressable>
									</View>

									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<Pressable
											onPress={() =>
												f_Bath === '0' ? setf_Bath('1') : setf_Bath('0')
											}
											style={[
												styles.select,
												{
													width: windowWidth * 0.25,
													height: windowWidth * 0.15,
													borderWidth: 1,
													borderRadius: 10,
												},
												f_Bath === '1' ? styles.selected : null,
											]}
										>
											<Text
												style={[
													styles.selectText,
													{ textAlign: 'center', lineHeight: 20 },
													f_Bath === '1' ? styles.selectedText : null,
												]}
											>
												Баня
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_GardenHouse === '0'
													? setf_GardenHouse('1')
													: setf_GardenHouse('0')
											}
											style={[
												styles.select,
												{
													width: windowWidth * 0.25,
													height: windowWidth * 0.15,
													borderWidth: 1,
													borderRadius: 10,
												},
												f_GardenHouse === '1' ? styles.selected : null,
											]}
										>
											<Text
												style={[
													styles.selectText,
													{ textAlign: 'center', lineHeight: 20 },
													f_GardenHouse === '1'
														? styles.selectedText
														: null,
												]}
											>
												Беседка
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_HouseholdBuilding === '0'
													? setf_HouseholdBuilding('1')
													: setf_HouseholdBuilding('0')
											}
											style={[
												styles.select,
												{
													width: windowWidth * 0.35,
													height: windowWidth * 0.15,
													borderWidth: 1,
													borderRadius: 10,
												},
												f_HouseholdBuilding === '1'
													? styles.selected
													: null,
											]}
										>
											<Text
												style={[
													styles.selectText,
													{ textAlign: 'center', lineHeight: 20 },
													f_HouseholdBuilding === '1'
														? styles.selectedText
														: null,
												]}
											>
												Другие хоз.{'\n'}постройки
											</Text>
										</Pressable>
									</View>
								</Fragment>
							) : null}
						</Fragment>
					) : null}

					{/* KADASTR */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ? null : (
						<Fragment>
							<Text style={styles.title}>Кадастровый номер</Text>
							<View style={{ flexDirection: 'row', marginBottom: 20 }}>
								<TextInput
									value={f_CadastralNumber}
									onChangeText={(value) => setf_CadastralNumber(value)}
									placeholder="Кадастровый номер"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.94,
										height: windowWidth * 0.1,
										borderRadius: 10,
									}}
								/>
							</View>
						</Fragment>
					)}

					{/* F_TYPESALE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Тип продажи</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_TypeSale}
									onValueChange={(itemValue) => setf_TypeSale(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Свободная" value="1" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_OFFERFROM */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ? null : (
						<View style={{ width: windowWidth * 0.94, marginBottom: 20 }}>
							<Text style={styles.title}>Предложение от</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={f_OfferFrom}
									onValueChange={(itemValue) => setf_OfferFrom(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Физическое лицо" value="1" />
									<Picker.Item label="Юридическое лицо" value="2" />
									<Picker.Item label="Застройщик" value="3" />
									<Picker.Item label="Организатор торгов" value="4" />
								</Picker>
							</View>
						</View>
					)}

					{/* PRICE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ? null : (
						<Fragment>
							<Text style={styles.title}>Цена</Text>
							<View style={{ flexDirection: 'row' }}>
								<TextInput
									value={f_Price}
									onChangeText={(value) => setf_Price(value)}
									placeholder="от"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.82,
										height: windowWidth * 0.1,
										borderTopLeftRadius: 10,
										borderBottomLeftRadius: 10,
										borderRightWidth: 0,
									}}
								/>

								<View style={styles.units}>
									<Text style={{ fontFamily: 'gothampro-regular' }}>руб.</Text>
								</View>
							</View>
						</Fragment>
					)}

					{/* MORTGAGE CHECKBOX */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : (
						<Pressable
							style={styles.checkBox}
							onPress={() => setf_Mortgage(f_Mortgage ? '' : '1')}
						>
							<CheckBox
								disabled={false}
								value={Boolean(f_Mortgage)}
								onValueChange={(newValue) => setf_Mortgage(f_Mortgage ? '' : '1')}
							/>
							<Text style={styles.checkBoxText}>Подходит под ипотеку</Text>
						</Pressable>
					)}

					{/* `PHONE` */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : (
						<Fragment>
							<Text style={styles.title}>Телефон</Text>
							<View style={{ flexDirection: 'row', marginBottom: 20 }}>
								<TextInput
									value={f_Phone}
									onChangeText={(value) => setf_Phone(value)}
									placeholder="Телефон"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.94,
										height: windowWidth * 0.1,
										borderRadius: 10,
									}}
								/>
							</View>
						</Fragment>
					)}

					{/* DESCRIPTION */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : (
						<Fragment>
							<Text style={styles.title}>Описание</Text>
							<View style={{ marginBottom: 20 }}>
								<TextInput
									multiline
									value={f_Description}
									onChangeText={(value) => setf_Description(value)}
									placeholder="Описание"
									keyboardType="default"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										paddingVertical: 5,
										textAlignVertical: 'top',
										width: windowWidth * 0.94,
										height: windowWidth * 0.3,
										borderWidth: 1,
										borderRadius: 10,
									}}
								/>
							</View>
						</Fragment>
					)}

					{/* YOUTUBE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : (
						<Fragment>
							<Text style={styles.title}>Ссылка на видео youtube</Text>
							<View style={{ flexDirection: 'row', marginBottom: 20 }}>
								<TextInput
									value={f_Video}
									onChangeText={(value) => setf_Video(value)}
									placeholder="Ссылка на видео youtube"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.94,
										height: windowWidth * 0.1,
										borderRadius: 10,
									}}
								/>
							</View>
						</Fragment>
					)}

					{/* Button ADD */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					f_NumberRooms == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ||
					!f_Phone ? null : (
						<View
							style={{
								alignItems: 'center',
							}}
						>
							<Pressable
								android_ripple={{ color: '#fff' }}
								style={{
									backgroundColor: '#912e33',
									width: windowWidth * 0.88,
									height: windowWidth * 0.1,
									borderRadius: 10,
									alignItems: 'center',
									justifyContent: 'center',
								}}
								onPress={() => {
									console.log('Button ДОБАВИТЬ')
									handleAddObject()
								}}
							>
								<Text
									style={{
										color: '#fdfffc',
										fontFamily: 'gothampro-regular',
										fontSize: 18,
									}}
								>
									Добавить
								</Text>
							</Pressable>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontFamily: 'gothampro-regular',
		fontSize: 18,
		color: '#000',
		marginBottom: 10,
	},
	select: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#868686',
		marginBottom: 20,
	},
	selected: {
		backgroundColor: '#acacac',
	},
	selectText: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
		color: '#000',
	},
	selectedText: {
		color: '#fff',
	},
	checkBox: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	checkBoxText: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
	},
	textInput: {
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		borderWidth: 1,
		borderColor: '#868686',
	},
	textInputInput: {
		fontSize: 15,
		fontFamily: 'gothampro-regular',
		fontWeight: 'normal',
	},
	units: {
		justifyContent: 'center',
		alignItems: 'center',
		width: windowWidth * 0.12,
		height: windowWidth * 0.1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderColor: '#868686',
		marginBottom: 20,
	},
})
