import React, { useReducer, useState } from 'react'
import { ScrollView, Pressable, Text, TextInput, View, Animated } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CheckBox from '@react-native-community/checkbox'
import md5 from 'md5'

import Header from '../components/Header'
import css from '../styles/cssSearchScreen'
import LextaService from '../services/LextaService'
import { updateTokenAction } from '../store/actions/auth'
import { connect, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const lexta = new LextaService()

const SEARCH_FORM = 'SEARCH_FORM'
const formReducer = (state, action) => {
	if (action.type == SEARCH_FORM) {
		return {
			...state,
			[action.input]: action.value,
		}
	}
	return state
}

export default function SearchScreen({ navigation }) {
	const dispatch = useDispatch()
	const [formState, dispatchFormState] = useReducer(formReducer, {
		cityOrRegion: '',
		catalogType: '1',
		f_Category: '',
		f_NumberRooms: '',
		objectType: '0',
		priceFrom: '',
		priceTo: '',
		totalAreaFrom: '',
		totalAreaTo: '',
		kitchenAreaFrom: '',
		kitchenAreaTo: '',
		floorFrom: '',
		floorTo: '',
		whichFloor1: '',
		whichFloor2: '',
		whichFloor3: '',
		f_HouseType: '',
		mortgage: '',
		video: '',
	})

	let {
		cityOrRegion,
		catalogType,
		f_Category,
		f_NumberRooms,
		objectType,
		priceFrom,
		priceTo,
		totalAreaFrom,
		totalAreaTo,
		kitchenAreaFrom,
		kitchenAreaTo,
		floorFrom,
		floorTo,
		whichFloor1,
		whichFloor2,
		whichFloor3,
		f_HouseType,
		mortgage,
		video,
	} = formState

	const inputChangeHandler = (inputIdentifier, inputValue) => {
		dispatchFormState({
			type: SEARCH_FORM,
			input: inputIdentifier,
			value: inputValue,
		})
	}

	const handleSearch = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const { Email, Token, UserId, expirationDate } = JSON.parse(userData)

		let params = `
		token=${Token}&
		user=${md5(Email)}&
		cityOrRegion=${cityOrRegion}&
		catalogType=${catalogType}&
		f_Category=${f_Category}&
		f_NumberRooms=${f_NumberRooms}&
		objectType=${objectType}&
		priceFrom=${priceFrom}&
		priceTo=${priceTo}&
		totalAreaFrom=${totalAreaFrom}&
		totalAreaTo=${totalAreaTo}&
		kitchenAreaFrom=${kitchenAreaFrom}&
		kitchenAreaTo=${kitchenAreaTo}&
		floorFrom=${floorFrom}&
		floorTo=${floorTo}&
		whichFloor1=${whichFloor1}&
		whichFloor2=${whichFloor2}&
		whichFloor3=${whichFloor3}&
		f_HouseType=${f_HouseType}&
		mortgage=${mortgage}&
		video=${video}`

		if (new Date(expirationDate) <= new Date()) {
			console.log('SearchScreen.js > if (expirationDate <= new Date())')
			try {
				await dispatch(updateTokenAction(Email, Token, UserId, userData))

				lexta
					.getSearchObjects(params)
					.then((res) => {
						console.log(res.status)
						return res.json()
					})
					.then((result) => navigation.navigate('Elements', { screen: 'SearchResult', params: { result } }))
					.catch((err) => console.log(err))
			} catch (err) {
				Alert.alert('Ошибка', 'Войти ещё раз', [{ text: 'Ok', onPress: () => authActions.logout() }])
				setError(err.message)
			}
		} else {
			console.log('SearchScreen.js > ok!')

			lexta
				.getSearchObjects(params)
				.then((res) => res.json())
				.then((result) => navigation.navigate('Elements', { screen: 'SearchResult', params: { result } }))
				.catch((err) => console.log(err))
		}
	}

	const scrollY = React.useRef(new Animated.Value(0)).current

	return (
		<React.Fragment>
			<Header navigation={navigation} scrollY={scrollY} />

			<ScrollView contentContainerStyle={css.scrollViewCCS} style={css.scrollView}>
				<View>
					<View style={{ marginBottom: 20 }}>
						<View style={css.viewCity}>
							<TextInput
								style={css.inputCity}
								placeholder="Укажите город или регион"
								value={cityOrRegion}
								onChangeText={(value) => inputChangeHandler('cityOrRegion', value)}
							/>
						</View>
						<View style={css.viewPickerBase}>
							<Picker
								style={css.picker}
								selectedValue={catalogType}
								onValueChange={(value) => inputChangeHandler('catalogType', value)}
							>
								<Picker.Item label="Продажа" value="1" />
								<Picker.Item label="Аренда" value="2" />
							</Picker>
						</View>
						<View style={[css.viewPickerBase, css.viewPickerCategory]}>
							<Picker style={css.picker} selectedValue={f_Category} onValueChange={(value) => inputChangeHandler('f_Category', value)}>
								<Picker.Item label="Категория" value="0" />
								<Picker.Item label="Комнаты" value="1" />
								<Picker.Item label="Квартиры" value="2" />
								<Picker.Item label="Дачи" value="3" />
								<Picker.Item label="Дома" value="4" />
								<Picker.Item label="Коттеджи" value="5" />
								<Picker.Item label="Таунхаусы" value="6" />
							</Picker>
						</View>
						<View style={[css.viewPickerBase, css.viewPickerRooms]}>
							<Picker
								style={css.picker}
								selectedValue={f_NumberRooms}
								onValueChange={(value) => inputChangeHandler('f_NumberRooms', value)}
							>
								<Picker.Item label="Комнат" value="0" />
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

					{/* OBJECT TYPE */}
					<Text style={css.title}>Вид объекта</Text>
					<View style={css.wrapperFrowMb20}>
						<Pressable
							onPress={() => inputChangeHandler('objectType', 1)}
							style={[css.selectBase, css.selectObjectTypelLeft, objectType === 1 ? css.selected : null]}
						>
							<Text style={[css.selectText, objectType === 1 ? css.selectedText : null]}>Все</Text>
						</Pressable>
						<Pressable
							onPress={() => inputChangeHandler('objectType', 3)}
							style={[css.selectBase, css.selectObjectTypelCenter, objectType === 3 ? css.selected : null]}
						>
							<Text style={[css.selectText, objectType === 3 ? css.selectedText : null]}>Новостройка</Text>
						</Pressable>
						<Pressable
							onPress={() => inputChangeHandler('objectType', 2)}
							style={[css.selectBase, css.selectObjectTypelRight, objectType === 2 ? css.selected : null]}
						>
							<Text style={[css.selectText, objectType === 2 ? css.selectedText : null]}>Вторичка</Text>
						</Pressable>
					</View>

					{/* PRICE */}
					<Text style={css.title}>Цена</Text>
					<View style={css.wrapperFrowMb20}>
						<TextInput
							value={priceFrom}
							onChangeText={(value) => inputChangeHandler('priceFrom', value)}
							placeholder="от"
							keyboardType="number-pad"
							style={css.inputPriceAreaLeft}
						/>
						<TextInput
							value={priceTo}
							onChangeText={(value) => inputChangeHandler('priceTo', value)}
							placeholder="до"
							keyboardType="number-pad"
							style={css.inputPriceAreaRight}
						/>

						<View style={css.unitsView}>
							<Text style={css.unitsText}>руб.</Text>
						</View>
					</View>

					{/* TOTAL AREA */}
					<Text style={css.title}>Общая площадь</Text>
					<View style={css.wrapperFrowMb20}>
						<TextInput
							value={totalAreaFrom}
							onChangeText={(value) => inputChangeHandler('totalAreaFrom', value)}
							placeholder="от"
							keyboardType="number-pad"
							style={css.inputPriceAreaLeft}
						/>
						<TextInput
							value={totalAreaTo}
							onChangeText={(value) => inputChangeHandler('totalAreaTo', value)}
							placeholder="до"
							keyboardType="number-pad"
							style={css.inputPriceAreaRight}
						/>

						<View style={css.unitsView}>
							<Text style={css.unitsText}>м2</Text>
						</View>
					</View>

					{/* KITCHEN AREA */}
					<Text style={css.title}>Площадь кухни</Text>
					<View style={css.wrapperFrowMb20}>
						<TextInput
							value={kitchenAreaFrom}
							onChangeText={(value) => inputChangeHandler('kitchenAreaFrom', value)}
							placeholder="от"
							keyboardType="number-pad"
							style={css.inputPriceAreaLeft}
						/>
						<TextInput
							value={kitchenAreaTo}
							onChangeText={(value) => inputChangeHandler('kitchenAreaTo', value)}
							placeholder="до"
							keyboardType="number-pad"
							style={css.inputPriceAreaRight}
						/>

						<View style={css.unitsView}>
							<Text style={css.unitsText}>м2</Text>
						</View>
					</View>

					{/* FLOOR */}
					<Text style={css.title}>Этаж</Text>
					<View style={{ marginBottom: 20 }}>
						<View style={{ flexDirection: 'row' }}>
							<TextInput
								value={floorFrom}
								onChangeText={(value) => inputChangeHandler('floorFrom', value)}
								placeholder="от"
								keyboardType="number-pad"
								style={[css.inputFloorBase, css.inputFloorLeft]}
							/>
							<TextInput
								value={floorTo}
								onChangeText={(value) => inputChangeHandler('floorTo', value)}
								placeholder="до"
								keyboardType="number-pad"
								style={[css.inputFloorBase, css.inputFloorRight]}
							/>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Pressable
								onPress={() => inputChangeHandler('whichFloor1', whichFloor1 ? '' : 1)}
								style={[css.selectBase, css.selectFloorLeft, whichFloor1 ? css.selected : null]}
							>
								<Text style={[css.selectText, whichFloor1 ? css.selectedText : null]}>Не первый</Text>
							</Pressable>
							<Pressable
								onPress={() => inputChangeHandler('whichFloor2', whichFloor2 ? '' : 1)}
								style={[css.selectBase, css.selectFloorCenter, whichFloor2 ? css.selected : null]}
							>
								<Text style={[css.selectText, whichFloor2 ? css.selectedText : null]}>Не последний</Text>
							</Pressable>
							<Pressable
								onPress={() => inputChangeHandler('whichFloor3', whichFloor3 ? '' : 1)}
								style={[css.selectBase, css.selectFloorRight, whichFloor3 ? css.selected : null]}
							>
								<Text style={[css.selectText, whichFloor3 ? css.selectedText : null]}>Последний</Text>
							</Pressable>
						</View>
					</View>

					{/* HOUSE TYPE */}
					<Text style={css.title}>Тип дома</Text>
					<View style={[css.viewPickerBase, css.viewPickerHouseType]}>
						<Picker style={css.picker} selectedValue={f_HouseType} onValueChange={(value) => inputChangeHandler('f_HouseType', value)}>
							<Picker.Item label="-- выбрать --" value="0" />
							<Picker.Item label="Кирпичный" value="1" />
							<Picker.Item label="Панельный" value="2" />
							<Picker.Item label="Деревянный" value="3" />
							<Picker.Item label="Монолитный" value="4" />
						</Picker>
					</View>

					{/* MORTGAGE CHECKBOX */}
					<Pressable style={css.checkBox} onPress={() => inputChangeHandler('mortgage', mortgage ? '' : 1)}>
						<CheckBox
							disabled={false}
							value={Boolean(mortgage)}
							onValueChange={() => inputChangeHandler('mortgage', mortgage ? '' : '1')}
						/>
						<Text style={css.checkBoxText}>Подходит под ипотеку</Text>
					</Pressable>

					{/* VIDEO CHECKBOX */}
					<Pressable style={css.checkBox} onPress={() => inputChangeHandler('video', video ? '' : '1')}>
						<CheckBox disabled={false} value={Boolean(video)} onValueChange={() => inputChangeHandler('video', video ? '' : '1')} />
						<Text style={css.checkBoxText}>С видео</Text>
					</Pressable>
					<View style={{ alignItems: 'center' }}>
						<Pressable android_ripple={{ color: '#fff' }} style={css.btnView} onPress={() => handleSearch()}>
							<Text style={css.btnText}>Найти</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</React.Fragment>
	)
}
