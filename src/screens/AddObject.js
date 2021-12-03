import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker'
import { Dimensions, TextInput, Pressable, ScrollView, StyleSheet, Text, View, Animated } from 'react-native'
import { useDispatch } from 'react-redux'
import css from '../styles/cssAddObject'
import { fonts } from '../styles/constants'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const ADD_OBJECT_FORM_UPDATE = 'ADD_OBJECT_FORM_UPDATE'
const formReducer = (state, action) => {
	if ((action.type = ADD_OBJECT_FORM_UPDATE)) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		}
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		}
		let updatedFormIsValid = true
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
		}
		return {
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid: updatedFormIsValid,
		}
	}
	return state
}

export default function AddObject() {
	// const [f_Name, setf_Name] = useState('')
	// const [f_Description, setf_Description] = useState('')
	// const [f_Type, setf_Type] = useState('0')
	// const [f_LeaseType, setf_LeaseType] = useState('0')
	// const [f_TravelType, setf_TravelType] = useState('0')
	// const [f_Region, setf_Region] = useState('')
	// const [f_City, setf_City] = useState('')
	// const [f_ObjectType, setf_ObjectType] = useState('0')
	// const [f_Category, setf_Category] = useState('0')
	// const [f_NumberRooms, setf_NumberRooms] = useState('0')
	// const [f_TypeProperty, setf_TypeProperty] = useState('')
	// const [f_SubwayStation, setf_SubwayStation] = useState('')
	// const [f_Street, setf_Street] = useState('')
	// const [f_HouseNumber, setf_HouseNumber] = useState('')
	// const [f_Price, setf_Price] = useState('')
	// const [f_PriceHistory, setf_PriceHistory] = useState('')
	// const [f_Finishing, setf_Finishing] = useState('0')
	// const [f_TotalArea, setf_TotalArea] = useState('')
	// const [f_KitchenArea, setf_KitchenArea] = useState('')
	// const [f_LivingArea, setf_LivingArea] = useState()
	// const [f_Floor, setf_Floor] = useState('')
	// const [f_FloorsInHouse, setf_FloorsInHouse] = useState('')
	// const [f_FirstFloorType, setf_FirstFloorType] = useState('')
	// const [f_HouseType, setf_HouseType] = useState('')
	// const [f_Bathroom, setf_Bathroom] = useState('0')
	// const [f_Window, setf_Window] = useState('0')
	// const [f_BalconyType, setf_BalconyType] = useState('0')
	// const [f_Elevator, setf_Elevator] = useState('0')
	// const [f_Parking, setf_Parking] = useState('0')
	// const [f_TypeSale, setf_TypeSale] = useState('0')
	// const [f_OfferFrom, setf_OfferFrom] = useState('0')
	// const [f_YearBuilt, setf_YearBuilt] = useState('')
	// const [f_Mortgage, setf_Mortgage] = useState('')
	// const [f_Video, setf_Video] = useState('')
	// const [f_Phone, setf_Phone] = useState('')
	// const [f_CadastralNumber, setf_CadastralNumber] = useState('')
	// const [f_Img, setf_Img] = useState('')
	// const [f_Latitude, setf_Latitude] = useState('0')
	// const [f_Longitude, setf_Longitude] = useState('0')
	// const [f_LandAppointment, setf_LandAppointment] = useState('0')
	// const [f_LandElectricity, setf_LandElectricity] = useState('0')
	// const [f_LandGas, setf_LandGas] = useState('0')
	// const [f_LandWater, setf_LandWater] = useState('0')
	// const [f_LandSewerage, setf_LandSewerage] = useState('0')
	// const [f_LandArea, setf_LandArea] = useState('0')
	// const [f_Carport, setf_Carport] = useState('0')
	// const [f_ParkingLot, setf_ParkingLot] = useState('0')
	// const [f_Garage, setf_Garage] = useState('0')
	// const [f_Bath, setf_Bath] = useState('0')
	// const [f_GardenHouse, setf_GardenHouse] = useState('0')
	// const [f_HouseholdBuilding, setf_HouseholdBuilding] = useState('0')
	// const [f_Facilities, setf_Facilities] = useState('0')
	// const [f_CommercialPropertyType, setf_CommercialPropertyType] = useState('0')
	// const [f_LocationCommercial, setf_LocationCommercial] = useState('0')
	// const [f_LeasePricePeriod, setf_LeasePricePeriod] = useState('0')
	// const [f_ViewsNum, setf_ViewsNum] = useState(0) // — DON'T SEND
	// const [f_ObjectChecked, setf_ObjectChecked] = useState(0) // — DON'T SEND
	// const [f_ObjectRejected, setf_ObjectRejected] = useState(0) // — DON'T SEND
	// const [f_ObjectRejectedComment, setf_ObjectRejectedComment] = useState('') // — DON'T SEND

	const dispatch = useDispatch()
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			f_Name: '',
			f_Description: '',
			f_Type: '',
			f_LeaseType: '',
			f_TravelType: '',
			f_Region: '',
			f_City: '',
			f_ObjectType: '',
			f_Category: '0',
			f_NumberRooms: '',
			f_TypeProperty: '',
			f_SubwayStation: '',
			f_Street: '',
			f_HouseNumber: '',
			f_Price: '',
			f_PriceHistory: '',
			f_Finishing: '',
			f_TotalArea: '',
			f_KitchenArea: '',
			f_LivingArea: '',
			f_Floor: '',
			f_FloorsInHouse: '',
			f_FirstFloorType: '',
			f_HouseType: '',
			f_Bathroom: '',
			f_Window: '',
			f_BalconyType: '',
			f_Elevator: '',
			f_Parking: '',
			f_TypeSale: '',
			f_OfferFrom: '',
			f_YearBuilt: '',
			f_Mortgage: '',
			f_Video: '',
			f_Phone: '',
			f_CadastralNumber: '',
			f_Img: '',
			f_Latitude: '',
			f_Longitude: '',
			f_LandAppointment: '',
			f_LandElectricity: '',
			f_LandGas: '',
			f_LandWater: '',
			f_LandSewerage: '',
			f_LandArea: '',
			f_Carport: '',
			f_ParkingLot: '',
			f_Garage: '',
			f_Bath: '',
			f_GardenHouse: '',
			f_HouseholdBuilding: '',
			f_Facilities: '',
			f_CommercialPropertyType: '',
			f_LocationCommercial: '',
			f_LeasePricePeriod: '',
		},
		inputValidities: {},
		formIsValid: false,
	})

	let {
		f_Name,
		f_Description,
		f_Type,
		f_LeaseType,
		f_TravelType,
		f_Region,
		f_City,
		f_ObjectType,
		f_Category,
		f_NumberRooms,
		f_TypeProperty,
		f_SubwayStation,
		f_Street,
		f_HouseNumber,
		f_Price,
		f_PriceHistory,
		f_Finishing,
		f_TotalArea,
		f_KitchenArea,
		f_LivingArea,
		f_Floor,
		f_FloorsInHouse,
		f_FirstFloorType,
		f_HouseType,
		f_Bathroom,
		f_Window,
		f_BalconyType,
		f_Elevator,
		f_Parking,
		f_TypeSale,
		f_OfferFrom,
		f_YearBuilt,
		f_Mortgage,
		f_Video,
		f_Phone,
		f_CadastralNumber,
		f_Img,
		f_Latitude,
		f_Longitude,
		f_LandAppointment,
		f_LandElectricity,
		f_LandGas,
		f_LandWater,
		f_LandSewerage,
		f_LandArea,
		f_Carport,
		f_ParkingLot,
		f_Garage,
		f_Bath,
		f_GardenHouse,
		f_HouseholdBuilding,
		f_Facilities,
		f_CommercialPropertyTyp,
		f_LocationCommercial,
		f_LeasePricePeriod,
		f_ViewsNum,
		f_ObjectChecked,
		f_ObjectRejected,
		f_ObjectRejectedComment,
	} = formState.inputValues

	let formData = new FormData()
	formData.append('cc', 6)
	formData.append('sub', 10)
	formData.append('posting', 1)

	for (let key in formState.inputValues) {
		formData.append(key, formState.inputValues[key])
	}

	const handleAddObject = async () => {
		console.log('handleAddObject')

		await fetch('https://lexta.pro/netcat/add.php', {
			method: 'post',
			mode: 'no-cors',
			headers: new Headers(),
			body: OLD_data,
		})
			.then((res) => {
				console.log(res.status)
				return res.text()
			})
			.then((json) => console.log('json', json))
			.catch((err) => console.log(err))
	}

	const inputChangeHandler = (inputIdentifier, inputValue) => {
		dispatchFormState({
			type: ADD_OBJECT_FORM_UPDATE,
			input: inputIdentifier,
			value: inputValue,
		})
	}
	console.log(formState.inputValues)

	return (
		<View style={css.mainViewWrapper}>
			<ScrollView contentContainerStyle={css.scrollViewCCS} style={css.scrollView}>
				<View>
					{/* F_CATEGORY */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>Категория</Text>
						<View style={[css.viewSelector, f_Category !== '0' ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker
								selectedValue={f_Category}
								onValueChange={(value) => {
									inputChangeHandler('f_Category', value)
									switch (value) {
										case '1':
											inputChangeHandler('f_Name', `Комнаты, ${f_TotalArea} м2`)

											break
										case '2':
											inputChangeHandler('f_Name', `Квартиры, ${f_TotalArea} м2`)

											break
										case '3':
											inputChangeHandler('f_Name', `Дачи, ${f_TotalArea} м2`)

											break
										case '4':
											inputChangeHandler('f_Name', `Дома, ${f_TotalArea} м2`)

											break
										case '5':
											inputChangeHandler('f_Name', `Коттеджи, ${f_TotalArea} м2`)

											break
										case '6':
											inputChangeHandler('f_Name', `Таунхаусы, ${f_TotalArea} м2`)

											break
										case '7':
											inputChangeHandler('f_Name', `Земельный участок, ${f_TotalArea} м2`)

											break
										case '8':
											inputChangeHandler('f_Name', `Гараж, ${f_TotalArea} м2`)

											break
										case '9':
											inputChangeHandler('f_Name', `Подвал, ${f_TotalArea} м2`)

											break
										case '10':
											inputChangeHandler('f_Name', `Машиноместо, ${f_TotalArea} м2`)

											break
										case '11':
											inputChangeHandler('f_Name', `Погреб (овощехранилище), ${f_TotalArea} м2`)

											break
										case '12':
											inputChangeHandler('f_Name', `Коммерческая недвижимость, ${f_TotalArea} м2`)
											break
										default:
											inputChangeHandler('f_Name', `не выбрано, ${f_TotalArea} м2`)
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
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Назначение</Text>
							<View style={[css.viewSelector, f_LandAppointment !== '0' ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_LandAppointment} onValueChange={(value) => inputChangeHandler('f_LandAppointment', value)}>
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
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип сделки</Text>
							<View style={[css.viewSelector, f_Type !== '0' ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_Type} onValueChange={(value) => inputChangeHandler('f_Type', value)}>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Аренда" value="1" />
									<Picker.Item label="Продажа" value="2" />
								</Picker>
							</View>
						</View>
					)}

					{/* F_LEASETYPE */}
					{f_Category == 0 ? null : f_Category >= 7 ? null : f_Type === '1' ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип аренды</Text>
							<View style={[css.viewSelector, f_LeaseType !== '0' ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_LeaseType} onValueChange={(value) => inputChangeHandler('f_LeaseType', value)}>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Длительная" value="1" />
									<Picker.Item label="Посуточная" value="2" />
								</Picker>
							</View>
						</View>
					) : null}
					{/* F_COMMERCIALPROPERTYTYPE */}
					{f_Category == 0 && !f_Type ? null : f_Category == 12 ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип коммерческой недвижимости</Text>
							<View style={css.viewSelector}>
								<Picker
									selectedValue={f_CommercialPropertyType}
									onValueChange={(value) => inputChangeHandler('f_CommercialPropertyType', value)}
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
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Расположение ком. недвижимости</Text>
							<View style={css.viewSelector}>
								<Picker
									selectedValue={f_LocationCommercial}
									onValueChange={(value) => inputChangeHandler('f_LocationCommercial', value)}
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
						<View style={css.viewRow}>
							<Pressable
								onPress={() => inputChangeHandler('f_ObjectType', 1)}
								style={[css.select, css.objectTypeLeft, f_ObjectType === 1 ? css.selected : null]}
							>
								<Text style={[css.selectText, f_ObjectType === 1 ? css.selectedText : null]}>Новостройка</Text>
							</Pressable>
							<Pressable
								onPress={() => inputChangeHandler('f_ObjectType', 2)}
								style={[css.select, css.objectTypeRight, f_ObjectType === 2 ? css.selected : null]}
							>
								<Text style={[css.selectText, f_ObjectType === 2 ? css.selectedText : null]}>Вторичка</Text>
							</Pressable>
						</View>
					)}
					{/* F_TRAVELTYPE */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category >= 7 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип туристического объекта</Text>
							<View style={[css.viewSelector, f_TravelType !== '0' ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_TravelType} onValueChange={(value) => inputChangeHandler('f_TravelType', value)}>
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
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category == 1 || f_Category >= 7 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Количество комнат</Text>
							<View style={[css.viewSelector, f_NumberRooms !== '0' ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_NumberRooms} onValueChange={(value) => inputChangeHandler('f_NumberRooms', value)}>
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
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
						<View style={css.viewRow}>
							<View>
								<Text style={css.title}>Регион</Text>
								<TextInput
									value={f_Region}
									onChangeText={(value) => inputChangeHandler('f_Region', value)}
									placeholder="Регион"
									keyboardType="default"
									style={[css.textInput, css.textInputInput, css.regionStreetInput]}
								/>
							</View>
							<View>
								<Text style={css.title}>Город</Text>
								<TextInput
									value={f_City}
									onChangeText={(value) => inputChangeHandler('f_City', value)}
									placeholder="Город"
									keyboardType="default"
									style={[css.textInput, css.textInputInput, css.cityHouseNumberinput]}
								/>
							</View>
						</View>
					)}
					{/* F_STREET, F_HOUSENUMBER */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 || !f_Region || !f_City ? null : f_Category >= 2 &&
					  f_NumberRooms == 0 ? null : (
						<View style={css.viewRow}>
							<View>
								<Text style={css.title}>Улица</Text>
								<TextInput
									value={f_Street}
									onChangeText={(value) => inputChangeHandler('f_Street', value)}
									placeholder="Улица"
									keyboardType="default"
									style={[css.textInput, css.textInputInput, css.regionStreetInput]}
								/>
							</View>
							<View>
								<Text style={css.title}>Номер дома</Text>
								<TextInput
									value={f_HouseNumber}
									onChangeText={(value) => inputChangeHandler('f_HouseNumber', value)}
									placeholder="Номер дома"
									keyboardType="number-pad"
									style={[css.textInput, css.textInputInput, css.cityHouseNumberinput]}
								/>
							</View>
						</View>
					)}

					{/* PROPERTY TYPE */}
					{/* <View style={css.viewRow}>
						<View style={css.viewSelector}>
							<Text style={css.title}>Тип недвижимости</Text>
							<TextInput
								value={f_TypeProperty}
								onChangeText={(value) => inputChangeHandler('f_TypeProperty', value)}
								placeholder="Тип недвижимости"
								keyboardType="default"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					</View> */}

					{/* LOCATION */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 || !f_Region || !f_City || !f_Street || !f_HouseNumber ? null : f_Category >=
							2 && f_NumberRooms == 0 ? null : (
						<View>
							<Text style={css.title}>Метка на карте</Text>
							<View style={css.viewLocation}>
								<TextInput
									// value={}
									// onChangeText={() => {}}
									placeholder="Широта, долгота"
									keyboardType="number-pad"
									style={[css.textInput, css.textInputInput, css.locationInput]}
								/>
								<Pressable android_ripple={{ color: '#fff' }} style={css.locationBtn} onPress={() => {}}>
									<Text style={css.locationTxt}>+</Text>
								</Pressable>
							</View>
						</View>
					)}
					{/* F_HOUSETYPE */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 || !f_Region || !f_City || !f_Street || !f_HouseNumber ? null : f_Category >=
					  7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип дома</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_HouseType} onValueChange={(value) => inputChangeHandler('f_HouseType', value)}>
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
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
						<Fragment>
							<Text style={css.title}>Год постройки</Text>
							<View style={css.viewRow}>
								<TextInput
									value={f_YearBuilt}
									onChangeText={(value) => inputChangeHandler('f_YearBuilt', value)}
									placeholder="Год постройки"
									keyboardType="number-pad"
									style={[css.textInput, css.textInputInput, css.fullRowInput]}
								/>
							</View>
						</Fragment>
					)}
					{/*  F_FLOOR */}

					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ? null : f_Category >= 3 && f_Category <= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Этаж</Text>
							<TextInput
								value={f_Floor}
								onChangeText={(value) => inputChangeHandler('f_Floor', value)}
								placeholder="Этаж"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					)}
					{/* F_FLOORSINHOUSE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Этажей в доме</Text>
							<TextInput
								value={f_FloorsInHouse}
								onChangeText={(value) => inputChangeHandler('f_FloorsInHouse', value)}
								placeholder="Этажей в доме"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					)}
					{/* F_FIRSTFLOORTYPE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип первого этаж</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_FirstFloorType} onValueChange={(value) => inputChangeHandler('f_FirstFloorType', value)}>
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
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_Floor ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ? null : f_Category == 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : f_Category == 1 ||
					  f_Category >= 8 ? (
						<View>
							<Text style={{ ...css.title, marginBottom: 5 }}>Площадь</Text>
							<View style={css.viewRow}>
								<View style={{ width: windowWidth * 0.47 }}>
									<Text style={css.title}>Общая</Text>
									<TextInput
										value={f_TotalArea}
										onChangeText={(value) => {
											inputChangeHandler('f_TotalArea', value)
											switch (f_Category) {
												case '1':
													inputChangeHandler('f_Name', `Комнаты, ${value} м2`)

													break
												case '2':
													inputChangeHandler('f_Name', `Квартиры, ${value} м2`)

													break
												case '3':
													inputChangeHandler('f_Name', `Дачи, ${value} м2`)

													break
												case '4':
													inputChangeHandler('f_Name', `Дома, ${value} м2`)

													break
												case '5':
													inputChangeHandler('f_Name', `Коттеджи, ${value} м2`)

													break
												case '6':
													inputChangeHandler('f_Name', `Таунхаусы, ${value} м2`)

													break
												case '7':
													inputChangeHandler('f_Name', `Земельный участок, ${value} м2`)

													break
												case '8':
													inputChangeHandler('f_Name', `Гараж, ${value} м2`)

													break
												case '9':
													inputChangeHandler('f_Name', `Подвал, ${value} м2`)

													break
												case '10':
													inputChangeHandler('f_Name', `Машиноместо, ${value} м2`)

													break
												case '11':
													inputChangeHandler('f_Name', `Погреб (овощехранилище), ${value} м2`)

													break
												case '12':
													inputChangeHandler('f_Name', `Коммерческая недвижимость, ${value} м2`)

													break
												default:
													inputChangeHandler('f_Name', `не выбрано, ${value} м2`)

													break
											}
										}}
										placeholder="Общая"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.totalAreaInput_1]}
									/>
								</View>

								<View style={{ width: windowWidth * 0.47 }}>
									<Text style={css.title}>Жилая</Text>
									<TextInput
										value={f_LivingArea}
										onChangeText={(value) => inputChangeHandler('f_LivingArea', value)}
										placeholder="Жилая"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.livingAreaInput_1]}
									/>
								</View>
							</View>
						</View>
					) : (
						<View>
							<Text style={{ ...css.title, marginBottom: 5 }}>Площадь</Text>
							<View style={css.viewRow}>
								<View style={{ width: windowWidth * 0.31 }}>
									<Text style={css.title}>Общая</Text>
									<TextInput
										value={f_TotalArea}
										onChangeText={(value) => {
											inputChangeHandler('f_TotalArea', value)
											switch (f_Category) {
												case '1':
													inputChangeHandler('f_Name', `Комнаты, ${value} м2`)

													break
												case '2':
													inputChangeHandler('f_Name', `Квартиры, ${value} м2`)

													break
												case '3':
													inputChangeHandler('f_Name', `Дачи, ${value} м2`)

													break
												case '4':
													inputChangeHandler('f_Name', `Дома, ${value} м2`)

													break
												case '5':
													inputChangeHandler('f_Name', `Коттеджи, ${value} м2`)

													break
												case '6':
													inputChangeHandler('f_Name', `Таунхаусы, ${value} м2`)

													break
												case '7':
													inputChangeHandler('f_Name', `Земельный участок, ${value} м2`)

													break
												case '8':
													inputChangeHandler('f_Name', `Гараж, ${value} м2`)

													break
												case '9':
													inputChangeHandler('f_Name', `Подвал, ${value} м2`)

													break
												case '10':
													inputChangeHandler('f_Name', `Машиноместо, ${value} м2`)

													break
												case '11':
													inputChangeHandler('f_Name', `Погреб (овощехранилище), ${value} м2`)

													break
												case '12':
													inputChangeHandler('f_Name', `Коммерческая недвижимость, ${value} м2`)

													break
												default:
													inputChangeHandler('f_Name', `не выбрано, ${value} м2`)

													break
											}
										}}
										placeholder="Общая"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.totalAreaInput_2]}
									/>
								</View>
								<View style={{ width: windowWidth * 0.32 }}>
									<Text style={css.title}>Кухни</Text>
									<TextInput
										value={f_KitchenArea}
										onChangeText={(value) => inputChangeHandler('f_KitchenArea', value)}
										placeholder="Кухни"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.kitchenAreaInput]}
									/>
								</View>
								<View style={{ width: windowWidth * 0.31 }}>
									<Text style={css.title}>Жилая</Text>
									<TextInput
										value={f_LivingArea}
										onChangeText={(value) => inputChangeHandler('f_LivingArea', value)}
										placeholder="Жилая"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.livingAreaInput_2]}
									/>
								</View>
							</View>
						</View>
					)}
					{/* F_FINISHING */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					// !f_KitchenArea ||
					!f_LivingArea ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
						<View style={css.viewRow}>
							<View style={{ width: windowWidth * 0.94, paddingRight: 3 }}>
								<Text style={css.title}>Отделка</Text>
								<View style={css.viewSelector}>
									<Picker selectedValue={f_Finishing} onValueChange={(value) => inputChangeHandler('f_Finishing', value)}>
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
					f_Finishing == 0 ? null : f_Category == 1 || f_Category >= 7 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Санузел</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_Bathroom} onValueChange={(value) => inputChangeHandler('f_Bathroom', value)}>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Совмещенный" value="1" />
									<Picker.Item label="Раздельный" value="2" />
									<Picker.Item label="На этаже" value="3" />
									<Picker.Item label="В комнате" value="4" />
									<Picker.Item label="В блоке" value="5" />
								</Picker>
							</View>
						</View>
					)}
					{/* F_WINDOW */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					!f_LivingArea ||
					// f_Bathroom == 0 ||

					f_Finishing == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
						<View style={{ width: windowWidth * 0.94, paddingRight: 3, marginBottom: 20 }}>
							<Text style={css.title}>Окна</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_Window} onValueChange={(value) => inputChangeHandler('f_Window', value)}>
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип балкона</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_BalconyType} onValueChange={(value) => inputChangeHandler('f_BalconyType', value)}>
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Лифт</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_Elevator} onValueChange={(value) => inputChangeHandler('f_Elevator', value)}>
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Парковка</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_Parking} onValueChange={(value) => inputChangeHandler('f_Parking', value)}>
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : f_Category ==
					  1 ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Удобства</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_Facilities} onValueChange={(value) => inputChangeHandler('f_Facilities', value)}>
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
							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>Электричество</Text>
								<View style={css.viewSelector}>
									<Picker
										selectedValue={f_LandElectricity}
										onValueChange={(value) => inputChangeHandler('f_LandElectricity', value)}
									>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Заведено" value="1" />
										<Picker.Item label="По границе" value="2" />
										<Picker.Item label="Имеется ТУ на подключение" value="3" />
									</Picker>
								</View>
							</View>

							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>Газ</Text>
								<View style={css.viewSelector}>
									<Picker selectedValue={f_LandGas} onValueChange={(value) => inputChangeHandler('f_LandGas', value)}>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Заведён" value="1" />
										<Picker.Item label="По границе" value="2" />
										<Picker.Item label="Имеется ТУ на подключение" value="3" />
									</Picker>
								</View>
							</View>

							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>Водоснабжение</Text>
								<View style={css.viewSelector}>
									<Picker selectedValue={f_LandWater} onValueChange={(value) => inputChangeHandler('f_LandWater', value)}>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Колодец" value="1" />
										<Picker.Item label="Централизованное" value="2" />
										<Picker.Item label="Скважина" value="3" />
									</Picker>
								</View>
							</View>

							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>Канализация</Text>
								<View style={css.viewSelector}>
									<Picker selectedValue={f_LandSewerage} onValueChange={(value) => inputChangeHandler('f_LandSewerage', value)}>
										<Picker.Item label="-- выбрать --" value="0" />
										<Picker.Item label="Централизованная" value="1" />
										<Picker.Item label="Септик" value="2" />
										<Picker.Item label="КНС" value="3" />
									</Picker>
								</View>
							</View>

							{f_Category >= 3 && f_Category <= 6 ? (
								<Fragment>
									<View style={css.viewSelectorWrapper}>
										<Text style={css.title}>Площадь участка (соток)</Text>
										<TextInput
											value={f_LandArea}
											onChangeText={(value) => inputChangeHandler('f_LandArea', value)}
											placeholder="Площадь участка (соток)"
											keyboardType="number-pad"
											style={[css.textInput, css.textInputInput, css.fullRowInput]}
										/>
									</View>

									<View style={css.viewWrapper_3_6_Btns}>
										<Pressable
											onPress={() =>
												f_Carport === '0' ? inputChangeHandler('f_Carport', '1') : inputChangeHandler('f_Carport', '0')
											}
											style={[css.select, css.press_3_6_w25, f_Carport === '1' ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_Carport === '1' ? css.selectedText : null]}>
												Навес{'\n'}для авто
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_ParkingLot === '0'
													? inputChangeHandler('f_ParkingLot', '1')
													: inputChangeHandler('f_ParkingLot', '0')
											}
											style={[css.select, css.press_3_6_w35, f_ParkingLot === '1' ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_ParkingLot === '1' ? css.selectedText : null]}>
												Парковочное{'\n'}место
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_Garage === '0' ? inputChangeHandler('f_Garage', '1') : inputChangeHandler('f_Garage', '0')
											}
											style={[css.select, css.press_3_6_w25, f_Garage === '1' ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_Garage === '1' ? css.selectedText : null]}>Гараж</Text>
										</Pressable>
									</View>

									<View style={css.viewWrapper_3_6_Btns}>
										<Pressable
											onPress={() => (f_Bath === '0' ? inputChangeHandler('f_Bath', '1') : inputChangeHandler('f_Bath', '0'))}
											style={[css.select, css.press_3_6_w25, f_Bath === '1' ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_Bath === '1' ? css.selectedText : null]}>Баня</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_GardenHouse === '0'
													? inputChangeHandler('f_GardenHouse', '1')
													: inputChangeHandler('f_GardenHouse', '0')
											}
											style={[css.select, css.press_3_6_w25, f_GardenHouse === '1' ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_GardenHouse === '1' ? css.selectedText : null]}>
												Беседка
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_HouseholdBuilding === '0'
													? inputChangeHandler('f_HouseholdBuilding', '1')
													: inputChangeHandler('f_HouseholdBuilding', '0')
											}
											style={[css.select, css.press_3_6_w35, f_HouseholdBuilding === '1' ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_HouseholdBuilding === '1' ? css.selectedText : null]}>
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<Fragment>
							<Text style={css.title}>Кадастровый номер</Text>
							<View style={css.viewRow}>
								<TextInput
									value={f_CadastralNumber}
									onChangeText={(value) => inputChangeHandler('f_CadastralNumber', value)}
									placeholder="Кадастровый номер"
									keyboardType="number-pad"
									style={[css.textInput, css.textInputInput, css.fullRowInput]}
								/>
							</View>
						</Fragment>
					)}

					{/* F_TYPESALE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Тип продажи</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_TypeSale} onValueChange={(value) => inputChangeHandler('f_TypeSale', value)}>
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>Предложение от</Text>
							<View style={css.viewSelector}>
								<Picker selectedValue={f_OfferFrom} onValueChange={(value) => inputChangeHandler('f_OfferFrom', value)}>
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<Fragment>
							<Text style={css.title}>Цена</Text>
							<View style={css.viewRow}>
								<TextInput
									value={f_Price}
									onChangeText={(value) => inputChangeHandler('f_Price', value)}
									placeholder="от"
									keyboardType="number-pad"
									style={[css.textInput, css.textInputInput, css.priceInput]}
								/>

								<View style={css.units}>
									<Text style={{ fontFamily: fonts.regular }}>руб.</Text>
								</View>
							</View>
						</Fragment>
					)}

					{/* MORTGAGE CHECKBOX */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<Pressable style={css.checkBox} onPress={() => setf_Mortgage(f_Mortgage ? '' : '1')}>
							<CheckBox
								disabled={false}
								value={Boolean(f_Mortgage)}
								onValueChange={(newValue) => inputChangeHandler('f_Mortgage', f_Mortgage ? '' : '1')}
							/>
							<Text style={css.checkBoxText}>Подходит под ипотеку</Text>
						</Pressable>
					)}

					{/* `PHONE` */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<Fragment>
							<Text style={css.title}>Телефон</Text>
							<View style={css.viewRow}>
								<TextInput
									value={f_Phone}
									onChangeText={(value) => inputChangeHandler('f_Phone', value)}
									placeholder="Телефон"
									keyboardType="number-pad"
									style={[css.textInput, css.textInputInput, css.fullRowInput]}
								/>
							</View>
						</Fragment>
					)}

					{/* DESCRIPTION */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<Fragment>
							<Text style={css.title}>Описание</Text>
							<View style={css.viewSelectorWrapper}>
								<TextInput
									multiline
									value={f_Description}
									onChangeText={(value) => inputChangeHandler('f_Description', value)}
									placeholder="Описание"
									keyboardType="default"
									style={[css.textInput, css.textInputInput, css.descrInput]}
								/>
							</View>
						</Fragment>
					)}

					{/* YOUTUBE */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<Fragment>
							<Text style={css.title}>Ссылка на видео youtube</Text>
							<View style={css.viewSelectorWrapper}>
								<TextInput
									value={f_Video}
									onChangeText={(value) => inputChangeHandler('f_Video', value)}
									placeholder="Ссылка на видео youtube"
									keyboardType="number-pad"
									style={[css.textInput, css.textInputInput, css.fullRowInput]}
								/>
							</View>
						</Fragment>
					)}

					{/* Button ADD */}
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
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
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ||
					f_OfferFrom == 0 ||
					!f_Price ||
					!f_Phone ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<View style={css.addViewWrapper}>
							<Pressable
								android_ripple={{ color: '#fff' }}
								style={css.addPress}
								onPress={() => {
									console.log('Button ДОБАВИТЬ')
									handleAddObject()
								}}
							>
								<Text style={css.addText}>Добавить</Text>
							</Pressable>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	)
}
