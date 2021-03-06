import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker'
import { Dimensions, TextInput, Pressable, ScrollView, StyleSheet, Text, View, Animated } from 'react-native'
import { useDispatch } from 'react-redux'
import css from '../styles/cssAddObject'
import { fonts } from '../styles/constants'
import { phoneMask } from '../components/scripts'

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
	console.log(formState.inputValues)

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
					{f_Category == 0 ? null : f_Category >= 7 ? null : f_Type === '1' ? (
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
					{f_Category == 0 || f_Type == 0 ? null : f_Category >= 7 ? null : (
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
					)}
					{/* F_TRAVELTYPE */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category >= 7 ? null : (
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
					)}
					{/* F_NUMBERROOMS */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category == 1 || f_Category >= 7 ? null : (
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
					)}
					{/* REGION & CITY */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
						<View style={css.viewRow}>
							<View>
								<Text style={css.title}>????????????</Text>
								<TextInput
									value={f_Region}
									onChangeText={(value) => inputChangeHandler('f_Region', value)}
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
					)}
					{/* F_STREET, F_HOUSENUMBER */}
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 || !f_Region || !f_City ? null : f_Category >= 2 &&
					  f_NumberRooms == 0 ? null : (
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
					)}

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
					{f_Category == 0 || f_Type == 0 || f_ObjectType == 0 || !f_Region || !f_City || !f_Street || !f_HouseNumber ? null : f_Category >=
							2 && f_NumberRooms == 0 ? null : (
						<View>
							<Text style={css.title}>?????????? ???? ??????????</Text>
							<View style={css.viewLocation}>
								<TextInput
									// value={}
									// onChangeText={() => {}}
									placeholder="????????????, ??????????????"
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
							<Text style={css.title}>????????</Text>
							<TextInput
								value={f_Floor}
								onChangeText={(value) => inputChangeHandler('f_Floor', value)}
								placeholder="????????"
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
					!f_YearBuilt ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
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
					!f_FloorsInHouse ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ? null : f_Category == 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : f_Category == 1 ||
					  f_Category >= 8 ? (
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
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					// !f_KitchenArea ||
					!f_LivingArea ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_KitchenArea ||
					!f_LivingArea ||
					f_Finishing == 0 ? null : f_Category == 1 || f_Category >= 7 ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					// f_Bathroom == 0 ||

					f_Finishing == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 7 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 &&
					  !f_KitchenArea ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : f_Category ==
					  1 ? (
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
					{f_Category == 0 ||
					f_Type == 0 ||
					f_ObjectType == 0 ||
					!f_Region ||
					!f_City ||
					!f_Street ||
					!f_HouseNumber ||
					f_HouseType == 0 ||
					!f_YearBuilt ||
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
						<View style={css.viewSelectorWrapper}>
							<Text style={css.title}>?????? ??????????????</Text>
							<View style={[css.viewSelector, f_TypeSale != 0 ? css.viewSelectorChecked : css.viewSelectorUnchecked]}>
								<Picker selectedValue={f_TypeSale} onValueChange={(value) => inputChangeHandler('f_TypeSale', value)}>
									<Picker.Item label="-- ?????????????? --" value="0" />
									<Picker.Item label="??????????????????" value="1" />
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
					!f_FloorsInHouse ||
					f_FirstFloorType == 0 ||
					!f_TotalArea ||
					!f_LivingArea ||
					f_Finishing == 0 ||
					// f_Bathroom == 0 ||
					f_Window == 0 ||
					!f_CadastralNumber ? null : f_Category >= 2 && f_NumberRooms == 0 ? null : !f_Category == 1 && !f_KitchenArea ? null : (
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
							<Text style={css.title}>????????</Text>
							<View style={css.viewRow}>
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
							<Text style={css.checkBoxText}>???????????????? ?????? ??????????????</Text>
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
									console.log('Button ????????????????')
									handleAddObject()
								}}
							>
								<Text style={css.addText}>????????????????</Text>
							</Pressable>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	)
}
