import React, { Fragment, useReducer, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker'
import { Dimensions, TextInput, Pressable, ScrollView, Text, View, Alert, ActivityIndicator, Image } from 'react-native'
import { connect, useSelector } from 'react-redux'
import css from '../styles/cssAddObject'
import { fonts } from '../styles/constants'
import { phoneMask } from '../components/scripts'
import LextaService from '../services/LextaService'
import MapMark from '../components/MapMark'
import * as ImagePicker from 'expo-image-picker'

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

function AddObject({ state, navigation }) {
	const authCookies = useSelector((state) => state.authCookies)

	const [loading, setLoading] = useState(false)
	const [mapMark, setMapMark] = useState(false)
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
			f_Carport: '0',
			f_ParkingLot: '0',
			f_Garage: '0',
			f_Bath: '0',
			f_GardenHouse: '0',
			f_HouseholdBuilding: '0',
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
		f_CommercialPropertyType,
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

	let coords = useSelector((state) => state.coords)
	coords = coords.split(',')
	console.log('coords', coords)
	const mapMarkToggle = () => {
		if (!mapMark) {
			setMapMark(!mapMark)
		} else {
			setMapMark(!mapMark)
		}
	}

	const [image1, setImage1] = useState(null)
	const [image2, setImage2] = useState(null)
	const [image3, setImage3] = useState(null)

	const pickImage1 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [16, 9],
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
			aspect: [16, 9],
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
			aspect: [16, 9],
			quality: 1,
		})

		if (!result.cancelled) {
			console.log(result)
			setImage3(result.uri)
		}
	}

	return (
		<View style={css.mainViewWrapper}>
			<ScrollView contentContainerStyle={css.scrollViewCCS} style={css.scrollView}>
				<View>
					{/* F_CATEGORY */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>??????????????????</Text>
						<View style={[css.viewSelector, f_Category !== '0' ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker
								selectedValue={f_Category}
								onValueChange={(value) => {
									inputChangeHandler('f_Category', value)
									switch (value) {
										case '1':
											inputChangeHandler('f_Name', `??????????????, ${f_TotalArea} ??2`)

											break
										case '2':
											inputChangeHandler('f_Name', `????????????????, ${f_TotalArea} ??2`)

											break
										case '3':
											inputChangeHandler('f_Name', `????????, ${f_TotalArea} ??2`)

											break
										case '4':
											inputChangeHandler('f_Name', `????????, ${f_TotalArea} ??2`)

											break
										case '5':
											inputChangeHandler('f_Name', `????????????????, ${f_TotalArea} ??2`)

											break
										case '6':
											inputChangeHandler('f_Name', `??????????????????, ${f_TotalArea} ??2`)

											break
										case '7':
											inputChangeHandler('f_Name', `?????????????????? ??????????????, ${f_TotalArea} ??2`)

											break
										case '8':
											inputChangeHandler('f_Name', `??????????, ${f_TotalArea} ??2`)

											break
										case '9':
											inputChangeHandler('f_Name', `????????????, ${f_TotalArea} ??2`)

											break
										case '10':
											inputChangeHandler('f_Name', `??????????????????????, ${f_TotalArea} ??2`)

											break
										case '11':
											inputChangeHandler('f_Name', `???????????? (????????????????????????????), ${f_TotalArea} ??2`)

											break
										case '12':
											inputChangeHandler('f_Name', `???????????????????????? ????????????????????????, ${f_TotalArea} ??2`)
											break
										default:
											inputChangeHandler('f_Name', `???? ??????????????, ${f_TotalArea} ??2`)
											break
									}
								}}
							>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="??????????????" value="1" />
								<Picker.Item label="????????????????" value="2" />
								<Picker.Item label="????????" value="3" />
								<Picker.Item label="????????" value="4" />
								<Picker.Item label="????????????????" value="5" />
								<Picker.Item label="??????????????????" value="6" />
								<Picker.Item label="?????????????????? ??????????????" value="7" />
								<Picker.Item label="??????????" value="8" />
								<Picker.Item label="????????????" value="9" />
								<Picker.Item label="??????????????????????" value="10" />
								<Picker.Item label="???????????? (????????????????????????????)" value="11" />
								<Picker.Item label="???????????????????????? ????????????????????????" value="12" />
							</Picker>
						</View>
					</View>
					{/* F_LANDAPPOINTMENT */}
					{f_Category == 7 ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>????????????????????</Text>
							<View style={[css.viewSelector, f_LandAppointment != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_LandAppointment} onValueChange={(value) => inputChangeHandler('f_LandAppointment', value)}>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="??????" value="1" />
									<Picker.Item label="?????? (??????)" value="2" />
									<Picker.Item label="????????????????????????" value="3" />
									<Picker.Item label="??????????????????????????" value="4" />
									<Picker.Item label="????????????????" value="5" />
								</Picker>
							</View>
						</View>
					) : null}
					{/* F_TYPE */}
					{f_Category == 0 ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>?????? ????????????</Text>
							<View style={[css.viewSelector, f_Type != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_Type} onValueChange={(value) => inputChangeHandler('f_Type', value)}>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="????????????" value="1" />
									<Picker.Item label="??????????????" value="2" />
								</Picker>
							</View>
						</View>
					)}
					{/* F_LEASETYPE */}
					{f_Category == 0 ? null : f_Category >= 7 ? null : f_Type == 1 ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>?????? ????????????</Text>
							<View style={[css.viewSelector, f_LeaseType != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_LeaseType} onValueChange={(value) => inputChangeHandler('f_LeaseType', value)}>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="????????????????????" value="1" />
									<Picker.Item label="????????????????????" value="2" />
								</Picker>
							</View>
						</View>
					) : null}
					{/* F_COMMERCIALPROPERTYTYPE */}
					{f_Category == 0 && !f_Type ? null : f_Category == 12 ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>?????? ???????????????????????? ????????????????????????</Text>
							<View style={css.viewSelector}>
								<Picker
									selectedValue={f_CommercialPropertyType}
									onValueChange={(value) => inputChangeHandler('f_CommercialPropertyType', value)}
								>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="?????????????? ??????????????????" value="1" />
									<Picker.Item label="???????????????????? ????????????????????" value="2" />
									<Picker.Item label="????????????????" value="3" />
									<Picker.Item label="??????????????????" value="4" />
									<Picker.Item label="???????????????????????? ??????????????" value="5" />
									<Picker.Item label="??????????????????" value="6" />
									<Picker.Item label="???????????????????? / ??????" value="7" />
									<Picker.Item label="???????????????? ?????????????? ????????????" value="8" />
									<Picker.Item label="??????????????????" value="9" />
								</Picker>
							</View>
						</View>
					) : null}
					{/* F_LOCATIONCOMMERCIAL */}
					{f_Category == 0 ? null : f_Category == 12 ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>???????????????????????? ??????. ????????????????????????</Text>
							<View style={css.viewSelector}>
								<Picker
									selectedValue={f_LocationCommercial}
									onValueChange={(value) => inputChangeHandler('f_LocationCommercial', value)}
								>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="?? ?????????? ????????" value="1" />
									<Picker.Item label="?? ????/????/????" value="2" />
									<Picker.Item label="????????" value="3" />
								</Picker>
							</View>
						</View>
					) : null}
					{/* F_OBJECTTYPE */}
					<View style={css.viewRow}>
						<Pressable
							onPress={() => inputChangeHandler('f_ObjectType', 1)}
							style={[css.select, css.objectTypeLeft, f_ObjectType === 1 ? css.selected : null]}
						>
							<Text style={[css.selectText, f_ObjectType === 1 ? css.selectedText : null]}>??????????????????????</Text>
						</Pressable>
						<Pressable
							onPress={() => inputChangeHandler('f_ObjectType', 2)}
							style={[css.select, css.objectTypeRight, f_ObjectType === 2 ? css.selected : null]}
						>
							<Text style={[css.selectText, f_ObjectType === 2 ? css.selectedText : null]}>????????????????</Text>
						</Pressable>
					</View>
					{/* F_TRAVELTYPE */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>?????? ???????????????????????????? ??????????????</Text>
						<View style={[css.viewSelector, f_TravelType != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_TravelType} onValueChange={(value) => inputChangeHandler('f_TravelType', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="??????????????" value="1" />
								<Picker.Item label="??????????" value="2" />
								<Picker.Item label="??????????????????" value="3" />
								<Picker.Item label="???????? ????????????" value="4" />
							</Picker>
						</View>
					</View>
					{/* F_NUMBERROOMS */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>???????????????????? ????????????</Text>
						<View style={[css.viewSelector, f_NumberRooms != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_NumberRooms} onValueChange={(value) => inputChangeHandler('f_NumberRooms', value)}>
								<Picker.Item label="-- ???? ?????????????? --" value="0" />
								<Picker.Item label="1 ??????????????" value="1" />
								<Picker.Item label="2 ??????????????" value="2" />
								<Picker.Item label="3 ??????????????" value="3" />
								<Picker.Item label="4 ??????????????" value="4" />
								<Picker.Item label="5 ????????????" value="5" />
								<Picker.Item label="6 ????????????" value="6" />
								<Picker.Item label="7 ????????????" value="7" />
							</Picker>
						</View>
					</View>
					{/* REGION & CITY */}
					<View style={css.viewRow}>
						<View>
							<Text style={css.title}>????????????</Text>
							<TextInput
								value={f_Region}
								onChangeText={(value) => {
									inputChangeHandler('f_Region', value)
									const lexta = new LextaService()
									lexta
										.autoSearch(value)
										.then((res) => res.json())
										.then((json) => console.log(json))
								}}
								placeholder="????????????"
								keyboardType="default"
								style={[css.textInput, css.textInputInput, css.regionStreetInput]}
							/>
						</View>
						<View>
							<Text style={css.title}>??????????</Text>
							<TextInput
								value={f_City}
								onChangeText={(value) => inputChangeHandler('f_City', value)}
								placeholder="??????????"
								keyboardType="default"
								style={[css.textInput, css.textInputInput, css.cityHouseNumberinput]}
							/>
						</View>
					</View>
					{/* F_STREET, F_HOUSENUMBER */}
					<View style={css.viewRow}>
						<View>
							<Text style={css.title}>??????????</Text>
							<TextInput
								value={f_Street}
								onChangeText={(value) => inputChangeHandler('f_Street', value)}
								placeholder="??????????"
								keyboardType="default"
								style={[css.textInput, css.textInputInput, css.regionStreetInput]}
							/>
						</View>
						<View>
							<Text style={css.title}>?????????? ????????</Text>
							<TextInput
								value={f_HouseNumber}
								onChangeText={(value) => inputChangeHandler('f_HouseNumber', value)}
								placeholder="?????????? ????????"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.cityHouseNumberinput]}
							/>
						</View>
					</View>
					{/* PROPERTY TYPE */}
					{/* <View style={css.viewRow}>
						<View style={css.viewSelector}>
							<Text style={css.title}>?????? ????????????????????????</Text>
							<TextInput
								value={f_TypeProperty}
								onChangeText={(value) => inputChangeHandler('f_TypeProperty', value)}
								placeholder="?????? ????????????????????????"
								keyboardType="default"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					</View> */}
					{/* LOCATION */}

					<View style={(css.addViewWrapper, { marginBottom: 20 })}>
						<Pressable android_ripple={{ color: '#fff' }} style={css.addPress} onPress={mapMarkToggle}>
							<Text style={css.addText}>{mapMark ? '?????????????? ?????????? ?? ??????????' : '???????????????? ?????????? ???? ??????????'}</Text>
						</Pressable>
					</View>

					{mapMark && <MapMark city={f_City} street={f_Street} houseNum={f_HouseNumber} />}

					{/* F_HOUSETYPE */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>?????? ????????</Text>
						<View style={[css.viewSelector, f_HouseType != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_HouseType} onValueChange={(value) => inputChangeHandler('f_HouseType', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="??????????????????" value="1" />
								<Picker.Item label="??????????????????" value="2" />
								<Picker.Item label="????????????????????" value="3" />
								<Picker.Item label="????????????????????" value="4" />
								<Picker.Item label="?????????????????? ??????????????????" value="5" />
								<Picker.Item label="?????????????????? ??????????????" value="6" />
								<Picker.Item label="????????????????" value="7" />
								<Picker.Item label="??????????????" value="8" />
							</Picker>
						</View>
					</View>
					{/* YEAR */}
					<Fragment>
						<Text style={css.title}>?????? ??????????????????</Text>
						<View style={css.viewRow}>
							<TextInput
								value={f_YearBuilt}
								onChangeText={(value) => inputChangeHandler('f_YearBuilt', value)}
								placeholder="?????? ??????????????????"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					</Fragment>
					{/*  F_FLOOR */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>????????</Text>
						<TextInput
							value={f_Floor}
							onChangeText={(value) => inputChangeHandler('f_Floor', value)}
							placeholder="????????"
							keyboardType="number-pad"
							style={[css.textInput, css.textInputInput, css.fullRowInput]}
						/>
					</View>
					{/* F_FLOORSINHOUSE */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>???????????? ?? ????????</Text>
						<TextInput
							value={f_FloorsInHouse}
							onChangeText={(value) => inputChangeHandler('f_FloorsInHouse', value)}
							placeholder="???????????? ?? ????????"
							keyboardType="number-pad"
							style={[css.textInput, css.textInputInput, css.fullRowInput]}
						/>
					</View>
					{/* F_FIRSTFLOORTYPE */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>?????? ?????????????? ????????</Text>
						<View style={[css.viewSelector, f_FirstFloorType != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_FirstFloorType} onValueChange={(value) => inputChangeHandler('f_FirstFloorType', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="??????????" value="1" />
								<Picker.Item label="??????????????" value="2" />
								<Picker.Item label="???????????????? ??????????????" value="3" />
							</Picker>
						</View>
					</View>
					{/* AREA */}
					{f_Category == 1 || f_Category >= 8 ? (
						<View>
							<Text style={{ ...css.title, marginBottom: 5 }}>??????????????</Text>
							<View style={css.viewRow}>
								<View style={{ width: windowWidth * 0.47 }}>
									<Text style={css.title}>??????????</Text>
									<TextInput
										value={f_TotalArea}
										onChangeText={(value) => {
											inputChangeHandler('f_TotalArea', value)
											switch (f_Category) {
												case '1':
													inputChangeHandler('f_Name', `??????????????, ${value} ??2`)

													break
												case '2':
													inputChangeHandler('f_Name', `????????????????, ${value} ??2`)

													break
												case '3':
													inputChangeHandler('f_Name', `????????, ${value} ??2`)

													break
												case '4':
													inputChangeHandler('f_Name', `????????, ${value} ??2`)

													break
												case '5':
													inputChangeHandler('f_Name', `????????????????, ${value} ??2`)

													break
												case '6':
													inputChangeHandler('f_Name', `??????????????????, ${value} ??2`)

													break
												case '7':
													inputChangeHandler('f_Name', `?????????????????? ??????????????, ${value} ??2`)

													break
												case '8':
													inputChangeHandler('f_Name', `??????????, ${value} ??2`)

													break
												case '9':
													inputChangeHandler('f_Name', `????????????, ${value} ??2`)

													break
												case '10':
													inputChangeHandler('f_Name', `??????????????????????, ${value} ??2`)

													break
												case '11':
													inputChangeHandler('f_Name', `???????????? (????????????????????????????), ${value} ??2`)

													break
												case '12':
													inputChangeHandler('f_Name', `???????????????????????? ????????????????????????, ${value} ??2`)

													break
												default:
													inputChangeHandler('f_Name', `???? ??????????????, ${value} ??2`)

													break
											}
										}}
										placeholder="??????????"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.totalAreaInput_1]}
									/>
								</View>

								<View style={{ width: windowWidth * 0.47 }}>
									<Text style={css.title}>??????????</Text>
									<TextInput
										value={f_LivingArea}
										onChangeText={(value) => inputChangeHandler('f_LivingArea', value)}
										placeholder="??????????"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.livingAreaInput_1]}
									/>
								</View>
							</View>
						</View>
					) : (
						<View>
							<Text style={{ ...css.title, marginBottom: 5 }}>??????????????</Text>
							<View style={css.viewRow}>
								<View style={{ width: windowWidth * 0.31 }}>
									<Text style={css.title}>??????????</Text>
									<TextInput
										value={f_TotalArea}
										onChangeText={(value) => {
											inputChangeHandler('f_TotalArea', value)
											switch (f_Category) {
												case '1':
													inputChangeHandler('f_Name', `??????????????, ${value} ??2`)

													break
												case '2':
													inputChangeHandler('f_Name', `????????????????, ${value} ??2`)

													break
												case '3':
													inputChangeHandler('f_Name', `????????, ${value} ??2`)

													break
												case '4':
													inputChangeHandler('f_Name', `????????, ${value} ??2`)

													break
												case '5':
													inputChangeHandler('f_Name', `????????????????, ${value} ??2`)

													break
												case '6':
													inputChangeHandler('f_Name', `??????????????????, ${value} ??2`)

													break
												case '7':
													inputChangeHandler('f_Name', `?????????????????? ??????????????, ${value} ??2`)

													break
												case '8':
													inputChangeHandler('f_Name', `??????????, ${value} ??2`)

													break
												case '9':
													inputChangeHandler('f_Name', `????????????, ${value} ??2`)

													break
												case '10':
													inputChangeHandler('f_Name', `??????????????????????, ${value} ??2`)

													break
												case '11':
													inputChangeHandler('f_Name', `???????????? (????????????????????????????), ${value} ??2`)

													break
												case '12':
													inputChangeHandler('f_Name', `???????????????????????? ????????????????????????, ${value} ??2`)

													break
												default:
													inputChangeHandler('f_Name', `???? ??????????????, ${value} ??2`)

													break
											}
										}}
										placeholder="??????????"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.totalAreaInput_2]}
									/>
								</View>
								<View style={{ width: windowWidth * 0.32 }}>
									<Text style={css.title}>??????????</Text>
									<TextInput
										value={f_KitchenArea}
										onChangeText={(value) => inputChangeHandler('f_KitchenArea', value)}
										placeholder="??????????"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.kitchenAreaInput]}
									/>
								</View>
								<View style={{ width: windowWidth * 0.31 }}>
									<Text style={css.title}>??????????</Text>
									<TextInput
										value={f_LivingArea}
										onChangeText={(value) => inputChangeHandler('f_LivingArea', value)}
										placeholder="??????????"
										keyboardType="number-pad"
										style={[css.textInput, css.textInputInput, css.livingAreaInput_2]}
									/>
								</View>
							</View>
						</View>
					)}
					{/* F_FINISHING */}
					<View style={css.viewRow}>
						<View style={{ width: windowWidth * 0.94, paddingRight: 3 }}>
							<Text style={css.title}>??????????????</Text>
							<View style={[css.viewSelector, f_Finishing != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_Finishing} onValueChange={(value) => inputChangeHandler('f_Finishing', value)}>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="?? ????????????????" value="1" />
									<Picker.Item label="?????? ??????????????" value="2" />
									<Picker.Item label="????????????????" value="3" />
									<Picker.Item label="WhiteBox" value="4" />
								</Picker>
							</View>
						</View>
					</View>
					{/* F_BATHROOM  */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>??????????????</Text>
						<View style={[css.viewSelector, f_Bathroom != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_Bathroom} onValueChange={(value) => inputChangeHandler('f_Bathroom', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="??????????????????????" value="1" />
								<Picker.Item label="????????????????????" value="2" />
								<Picker.Item label="???? ??????????" value="3" />
								<Picker.Item label="?? ??????????????" value="4" />
								<Picker.Item label="?? ??????????" value="5" />
							</Picker>
						</View>
					</View>
					{/* F_WINDOW */}
					<View style={{ width: windowWidth * 0.94, paddingRight: 3, marginBottom: 20 }}>
						<Text style={css.title}>????????</Text>
						<View style={[css.viewSelector, f_Window != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_Window} onValueChange={(value) => inputChangeHandler('f_Window', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="???? ????????" value="1" />
								<Picker.Item label="???? ??????????" value="2" />
							</Picker>
						</View>
					</View>
					{/* F_BALCONYTYPE */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>?????? ??????????????</Text>
						<View style={[css.viewSelector, f_BalconyType != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_BalconyType} onValueChange={(value) => inputChangeHandler('f_BalconyType', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="????????????" value="1" />
								<Picker.Item label="????????????" value="2" />
							</Picker>
						</View>
					</View>
					{/* F_ELEVATOR */}
					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>????????</Text>
						<View style={[css.viewSelector, f_Elevator != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_Elevator} onValueChange={(value) => inputChangeHandler('f_Elevator', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="????????????????????????" value="1" />
								<Picker.Item label="????????????????" value="2" />
								<Picker.Item label="???????????????????????? ?? ????????????????" value="3" />
							</Picker>
						</View>
					</View>
					{/* F_PARKING */}

					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>????????????????</Text>
						<View style={[css.viewSelector, f_Parking != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_Parking} onValueChange={(value) => inputChangeHandler('f_Parking', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="????????????????" value="1" />
								<Picker.Item label="??????????????????" value="2" />
							</Picker>
						</View>
					</View>

					{/* F_FACILITIES */}
					{f_Category == 1 ? (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>????????????????</Text>
							<View style={[css.viewSelector, f_Facilities != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_Facilities} onValueChange={(value) => inputChangeHandler('f_Facilities', value)}>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="???? ??????????" value="1" />
									<Picker.Item label="?? ??????????????" value="2" />
									<Picker.Item label="?? ??????????" value="3" />
								</Picker>
							</View>
						</View>
					) : null}
					{/* F_LANDELECTRICITY, F_LANDGAS, F_LANDWATER, F_LANDSEWERAGE, F_LANDAREA, F_CARPORT, F_PARKINGLOT, F_GARAGE, F_BATH, F_GARDENHOUSE, F_HOUSEHOLDBUILDING */}
					{f_Category >= 3 && f_Category <= 7 ? (
						<Fragment>
							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>??????????????????????????</Text>
								<View style={css.viewSelector}>
									<Picker
										selectedValue={f_LandElectricity}
										onValueChange={(value) => inputChangeHandler('f_LandElectricity', value)}
									>
										<Picker.Item label="-- ?????????????? --" value="0" />
										<Picker.Item label="????????????????" value="1" />
										<Picker.Item label="???? ??????????????" value="2" />
										<Picker.Item label="?????????????? ???? ???? ??????????????????????" value="3" />
									</Picker>
								</View>
							</View>

							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>??????</Text>
								<View style={css.viewSelector}>
									<Picker selectedValue={f_LandGas} onValueChange={(value) => inputChangeHandler('f_LandGas', value)}>
										<Picker.Item label="-- ?????????????? --" value="0" />
										<Picker.Item label="??????????????" value="1" />
										<Picker.Item label="???? ??????????????" value="2" />
										<Picker.Item label="?????????????? ???? ???? ??????????????????????" value="3" />
									</Picker>
								</View>
							</View>

							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>??????????????????????????</Text>
								<View style={css.viewSelector}>
									<Picker selectedValue={f_LandWater} onValueChange={(value) => inputChangeHandler('f_LandWater', value)}>
										<Picker.Item label="-- ?????????????? --" value="0" />
										<Picker.Item label="??????????????" value="1" />
										<Picker.Item label="????????????????????????????????" value="2" />
										<Picker.Item label="????????????????" value="3" />
									</Picker>
								</View>
							</View>

							<View style={css.viewSelectorWrapper}>
								<Text style={css.title}>??????????????????????</Text>
								<View style={css.viewSelector}>
									<Picker selectedValue={f_LandSewerage} onValueChange={(value) => inputChangeHandler('f_LandSewerage', value)}>
										<Picker.Item label="-- ?????????????? --" value="0" />
										<Picker.Item label="????????????????????????????????" value="1" />
										<Picker.Item label="????????????" value="2" />
										<Picker.Item label="??????" value="3" />
									</Picker>
								</View>
							</View>

							{f_Category >= 3 && f_Category <= 6 ? (
								<Fragment>
									<View style={css.viewSelectorWrapper}>
										<Text style={css.title}>?????????????? ?????????????? (??????????)</Text>
										<TextInput
											value={f_LandArea}
											onChangeText={(value) => inputChangeHandler('f_LandArea', value)}
											placeholder="?????????????? ?????????????? (??????????)"
											keyboardType="number-pad"
											style={[css.textInput, css.textInputInput, css.fullRowInput]}
										/>
									</View>

									<View style={css.viewWrapper_3_6_Btns}>
										<Pressable
											onPress={() =>
												f_Carport === '0' ? inputChangeHandler('f_Carport', '1') : inputChangeHandler('f_Carport', '0')
											}
											style={[css.select, css.press_3_6_w25, f_Carport == 1 ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_Carport == 1 ? css.selectedText : null]}>
												??????????{'\n'}?????? ????????
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_ParkingLot === '0'
													? inputChangeHandler('f_ParkingLot', '1')
													: inputChangeHandler('f_ParkingLot', '0')
											}
											style={[css.select, css.press_3_6_w35, f_ParkingLot == 1 ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_ParkingLot == 1 ? css.selectedText : null]}>
												??????????????????????{'\n'}??????????
											</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_Garage === '0' ? inputChangeHandler('f_Garage', '1') : inputChangeHandler('f_Garage', '0')
											}
											style={[css.select, css.press_3_6_w25, f_Garage == 1 ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_Garage == 1 ? css.selectedText : null]}>??????????</Text>
										</Pressable>
									</View>

									<View style={css.viewWrapper_3_6_Btns}>
										<Pressable
											onPress={() => (f_Bath === '0' ? inputChangeHandler('f_Bath', '1') : inputChangeHandler('f_Bath', '0'))}
											style={[css.select, css.press_3_6_w25, f_Bath == 1 ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_Bath == 1 ? css.selectedText : null]}>????????</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_GardenHouse === '0'
													? inputChangeHandler('f_GardenHouse', '1')
													: inputChangeHandler('f_GardenHouse', '0')
											}
											style={[css.select, css.press_3_6_w25, f_GardenHouse == 1 ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_GardenHouse == 1 ? css.selectedText : null]}>??????????????</Text>
										</Pressable>
										<Pressable
											onPress={() =>
												f_HouseholdBuilding === '0'
													? inputChangeHandler('f_HouseholdBuilding', '1')
													: inputChangeHandler('f_HouseholdBuilding', '0')
											}
											style={[css.select, css.press_3_6_w35, f_HouseholdBuilding == 1 ? css.selected : null]}
										>
											<Text style={[css.selectText, css.text_3_6, f_HouseholdBuilding == 1 ? css.selectedText : null]}>
												???????????? ??????.{'\n'}??????????????????
											</Text>
										</Pressable>
									</View>
								</Fragment>
							) : null}
						</Fragment>
					) : null}
					{/* KADASTR */}

					<Fragment>
						<Text style={css.title}>?????????????????????? ??????????</Text>
						<View style={css.viewRow}>
							<TextInput
								value={f_CadastralNumber}
								onChangeText={(value) => inputChangeHandler('f_CadastralNumber', value)}
								placeholder="?????????????????????? ??????????"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					</Fragment>

					{/* F_TYPESALE */}

					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>?????? ??????????????</Text>
						<View style={[css.viewSelector, f_TypeSale != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_TypeSale} onValueChange={(value) => inputChangeHandler('f_TypeSale', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="??????????????????" value="1" />
							</Picker>
						</View>
					</View>

					{/* F_OFFERFROM */}

					<View style={css.viewSelectorWrapper}>
						<Text style={css.title}>?????????????????????? ????</Text>
						<View style={[css.viewSelector, f_OfferFrom != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
							<Picker selectedValue={f_OfferFrom} onValueChange={(value) => inputChangeHandler('f_OfferFrom', value)}>
								<Picker.Item label="-- ?????????????? --" value="0" />
								<Picker.Item label="???????????????????? ????????" value="1" />
								<Picker.Item label="?????????????????????? ????????" value="2" />
								<Picker.Item label="????????????????????" value="3" />
								<Picker.Item label="?????????????????????? ????????????" value="4" />
							</Picker>
						</View>
					</View>

					{/* PRICE */}

					<View>
						<Text style={css.title}>????????</Text>
						<View style={[css.viewRow, { marginBottom: 0 }]}>
							<TextInput
								value={f_Price}
								onChangeText={(value) => inputChangeHandler('f_Price', value)}
								placeholder="????"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.priceInput]}
							/>

							<View style={css.units}>
								<Text style={{ fontFamily: fonts.regular }}>??????.</Text>
							</View>
						</View>
					</View>

					{/* MORTGAGE CHECKBOX */}

					<Pressable style={css.checkBox} onPress={() => setf_Mortgage(f_Mortgage ? '' : '1')}>
						<CheckBox
							disabled={false}
							value={Boolean(f_Mortgage)}
							onValueChange={(newValue) => inputChangeHandler('f_Mortgage', f_Mortgage ? '' : '1')}
						/>
						<Text style={css.checkBoxText}>???????????????? ?????? ??????????????</Text>
					</Pressable>

					{/* `PHONE` */}

					<Fragment>
						<Text style={css.title}>??????????????</Text>
						<View style={css.viewRow}>
							<TextInput
								value={f_Phone}
								onChangeText={(value) => {
									value = phoneMask(value)
									value = inputChangeHandler('f_Phone', value)
								}}
								placeholder="??????????????"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					</Fragment>

					{/* DESCRIPTION */}

					<Fragment>
						<Text style={css.title}>????????????????</Text>
						<View style={css.viewSelectorWrapper}>
							<TextInput
								multiline
								value={f_Description}
								onChangeText={(value) => inputChangeHandler('f_Description', value)}
								placeholder="????????????????"
								keyboardType="default"
								style={[css.textInput, css.textInputInput, css.descrInput]}
							/>
						</View>
					</Fragment>

					{/* YOUTUBE */}

					<Fragment>
						<Text style={css.title}>???????????? ???? ?????????? youtube</Text>
						<View style={css.viewSelectorWrapper}>
							<TextInput
								value={f_Video}
								onChangeText={(value) => inputChangeHandler('f_Video', value)}
								placeholder="???????????? ???? ?????????? youtube"
								keyboardType="number-pad"
								style={[css.textInput, css.textInputInput, css.fullRowInput]}
							/>
						</View>
					</Fragment>

					{/* PICK PHOTOS */}
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
						<Pressable
							android_ripple={{ color: '#fff' }}
							style={{
								width: windowWidth * 0.16 * 1.8,
								height: windowWidth * 0.09 * 1.8,
								backgroundColor: '#ddd',
								borderRadius: 10,
								justifyContent: 'center',
								marginHorizontal: 5,
							}}
							onPress={pickImage1}
						>
							{image1 ? (
								<Image
									style={{ width: windowWidth * 0.16 * 1.8, height: windowWidth * 0.09 * 1.8, borderRadius: 10 }}
									source={{ uri: image1 }}
								/>
							) : (
								<Text style={{ fontSize: 15, fontFamily: fonts.regular, color: '#999', textAlign: 'center' }}>
									????????????????{'\n'}????????
								</Text>
							)}
						</Pressable>
						<Pressable
							android_ripple={{ color: '#fff' }}
							style={{
								width: windowWidth * 0.16 * 1.8,
								height: windowWidth * 0.09 * 1.8,
								backgroundColor: '#ddd',
								borderRadius: 10,
								justifyContent: 'center',
								marginHorizontal: 5,
							}}
							onPress={pickImage2}
						>
							{image2 ? (
								<View>
									<Image
										style={{ width: windowWidth * 0.16 * 1.8, height: windowWidth * 0.09 * 1.8, borderRadius: 10 }}
										source={{ uri: image2 }}
									/>
								</View>
							) : (
								<Text style={{ fontSize: 15, fontFamily: fonts.regular, color: '#999', textAlign: 'center' }}>
									????????????????{'\n'}????????
								</Text>
							)}
						</Pressable>
						<Pressable
							android_ripple={{ color: '#fff' }}
							style={{
								width: windowWidth * 0.16 * 1.8,
								height: windowWidth * 0.09 * 1.8,
								backgroundColor: '#ddd',
								borderRadius: 10,
								justifyContent: 'center',
								marginHorizontal: 5,
							}}
							onPress={pickImage3}
						>
							{image3 ? (
								<View>
									<Image
										style={{ width: windowWidth * 0.16 * 1.8, height: windowWidth * 0.09 * 1.8, borderRadius: 10 }}
										source={{ uri: image3 }}
									/>
								</View>
							) : (
								<Text style={{ fontSize: 15, fontFamily: fonts.regular, color: '#999', textAlign: 'center' }}>
									????????????????{'\n'}????????
								</Text>
							)}
						</Pressable>
					</View>

					{/* Button ADD */}

					<View style={css.addViewWrapper}>
						<Pressable
							android_ripple={{ color: '#fff' }}
							style={css.addPress}
							onPress={() => {
								setLoading(true)
								setMapMark(false)
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
								data.append('f_Latitude', coords[0])
								data.append('f_Longitude', coords[1])
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
								// data.append('f_ViewsNum', f_ViewsNum)
								// data.append('f_ObjectChecked', f_ObjectChecked)
								// data.append('f_ObjectRejected', f_ObjectRejected)
								// data.append('f_ObjectRejectedComment', f_ObjectRejectedComment)
								console.log(data)
								if (image1 && image2 && image3) {
									data.append('f_Img_file[]', { uri: image1, name: image1.split('/').pop(), type: 'image/jpg' })
									data.append('f_Img_file[]', { uri: image2, name: image2.split('/').pop(), type: 'image/jpg' })
									data.append('f_Img_file[]', { uri: image3, name: image3.split('/').pop(), type: 'image/jpg' })
									data.append('settings_Img[use_preview]', 1)
									data.append('settings_Img[preview_width]', 120)
									data.append('settings_Img[preview_height]', 100)
									data.append('settings_Img_hash', 'f421907ea9d21e51ad744d7d0f33eac7')
								}

								fetch('https://lexta.pro/netcat/modules/auth/', {
									method: 'POST',
									body: secondAuth,
								})
									.then((res) => res.ok)
									.then((ok) => {
										if (ok) {
											// console.log('response OK', ok)
											let xhr = new XMLHttpRequest()
											xhr.open('POST', 'https://lexta.pro/netcat/add.php')
											xhr.setRequestHeader('Content-Type', 'multipart/form-data')
											xhr.send(data)
										}
									})
									.then(() => {
										setTimeout(() => {
											setLoading(false)
											Alert.alert('??????????????????', '?????? ???????????? ????????????????!', [
												{ text: '?????? ??????????????', onPress: () => navigation.navigate('ProfileMenu', { screen: 'MyObjects' }) },
											])
										}, 3000)
									})
							}}
						>
							<Text style={css.addText}>{loading ? <ActivityIndicator color="#fff" /> : '????????????????'}</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
export default connect(mapStateToProps)(AddObject)
