import React, { useState } from 'react'
import { ScrollView, Pressable, Text, TextInput, View, Animated } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CheckBox from '@react-native-community/checkbox'
import md5 from 'md5'

import Header from '../components/Header'
import css from '../styles/cssSearchScreen'
import LextaService from '../services/LextaService'

const lexta = new LextaService()

export default function SearchScreen({ navigation }) {
	const [cityOrRegion, setcityOrRegion] = useState('')
	const [catalogType, setcatalogType] = useState(1)
	const [f_Category, setf_Category] = useState('')
	const [f_NumberRooms, setf_NumberRooms] = useState('')
	const [objectType, setobjectType] = useState(0)
	const [priceFrom, setpriceFrom] = useState('')
	const [priceTo, setpriceTo] = useState('')
	const [totalAreaFrom, settotalAreaFrom] = useState('')
	const [totalAreaTo, settotalAreaTo] = useState('')
	const [kitchenAreaFrom, setkitchenAreaFrom] = useState('')
	const [kitchenAreaTo, setkitchenAreaTo] = useState('')
	const [floorFrom, setfloorFrom] = useState('')
	const [floorTo, setfloorTo] = useState('')
	const [whichFloor1, setwhichFloor1] = useState('')
	const [whichFloor2, setwhichFloor2] = useState('')
	const [whichFloor3, setwhichFloor3] = useState('')
	const [f_HouseType, setf_HouseType] = useState('')
	const [mortgage, setmortgage] = useState('')
	const [video, setvideo] = useState('')

	// let params = `
	// token=${store.getState().reducerUser.Token}&
	// user=${md5(store.getState().reducerUser.Email)}&
	// cityOrRegion=${cityOrRegion}&
	// catalogType=${catalogType}&
	// f_Category=${f_Category}&
	// f_NumberRooms=${f_NumberRooms}&
	// objectType=${objectType}&
	// priceFrom=${priceFrom}&
	// priceTo=${priceTo}&
	// totalAreaFrom=${totalAreaFrom}&
	// totalAreaTo=${totalAreaTo}&
	// kitchenAreaFrom=${kitchenAreaFrom}&
	// kitchenAreaTo=${kitchenAreaTo}&
	// floorFrom=${floorFrom}&
	// floorTo=${floorTo}&
	// whichFloor1=${whichFloor1}&
	// whichFloor2=${whichFloor2}&
	// whichFloor3=${whichFloor3}&
	// f_HouseType=${f_HouseType}&
	// mortgage=${mortgage}&
	// video=${video}`

	const handleSearch = async () => {
		lexta
			.getSearchObjects(params)
			.then((res) => {
				console.log(res.status)
				return res.json()
			})
			.then((result) => navigation.navigate('SearchResult', { result }))
			.catch((err) => console.log(err))
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
								onChangeText={(value) => setcityOrRegion(value)}
							/>
						</View>
						<View style={css.viewPickerBase}>
							<Picker style={css.picker} selectedValue={catalogType} onValueChange={(itemValue) => setcatalogType(itemValue)}>
								<Picker.Item label="Продажа" value="1" />
								<Picker.Item label="Аренда" value="2" />
							</Picker>
						</View>
						<View style={[css.viewPickerBase, css.viewPickerCategory]}>
							<Picker style={css.picker} selectedValue={f_Category} onValueChange={(itemValue) => setf_Category(itemValue)}>
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
							<Picker style={css.picker} selectedValue={f_NumberRooms} onValueChange={(itemValue) => setf_NumberRooms(itemValue)}>
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
							onPress={() => setobjectType(1)}
							style={[css.selectBase, css.selectObjectTypelLeft, objectType === 1 ? css.selected : null]}
						>
							<Text style={[css.selectText, objectType === 1 ? css.selectedText : null]}>Все</Text>
						</Pressable>
						<Pressable
							onPress={() => setobjectType(3)}
							style={[css.selectBase, css.selectObjectTypelCenter, objectType === 3 ? css.selected : null]}
						>
							<Text style={[css.selectText, objectType === 3 ? css.selectedText : null]}>Новостройка</Text>
						</Pressable>
						<Pressable
							onPress={() => setobjectType(2)}
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
							onChangeText={(value) => setpriceFrom(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={css.inputPriceAreaLeft}
						/>
						<TextInput
							value={priceTo}
							onChangeText={(value) => setpriceTo(value)}
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
							onChangeText={(value) => settotalAreaFrom(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={css.inputPriceAreaLeft}
						/>
						<TextInput
							value={totalAreaTo}
							onChangeText={(value) => settotalAreaTo(value)}
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
							onChangeText={(value) => setkitchenAreaFrom(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={css.inputPriceAreaLeft}
						/>
						<TextInput
							value={kitchenAreaTo}
							onChangeText={(value) => setkitchenAreaTo(value)}
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
								onChangeText={(value) => setfloorFrom(value)}
								placeholder="от"
								keyboardType="number-pad"
								style={[css.inputFloorBase, css.inputFloorLeft]}
							/>
							<TextInput
								value={floorTo}
								onChangeText={(value) => setfloorTo(value)}
								placeholder="до"
								keyboardType="number-pad"
								style={[css.inputFloorBase, css.inputFloorRight]}
							/>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Pressable
								onPress={() => setwhichFloor1(whichFloor1 ? '' : 1)}
								style={[css.selectBase, css.selectFloorLeft, whichFloor1 ? css.selected : null]}
							>
								<Text style={[css.selectText, whichFloor1 ? css.selectedText : null]}>Не первый</Text>
							</Pressable>
							<Pressable
								onPress={() => setwhichFloor2(whichFloor2 ? '' : 1)}
								style={[css.selectBase, css.selectFloorCenter, whichFloor2 ? css.selected : null]}
							>
								<Text style={[css.selectText, whichFloor2 ? css.selectedText : null]}>Не последний</Text>
							</Pressable>
							<Pressable
								onPress={() => setwhichFloor3(whichFloor3 ? '' : 1)}
								style={[css.selectBase, css.selectFloorRight, whichFloor3 ? css.selected : null]}
							>
								<Text style={[css.selectText, whichFloor3 ? css.selectedText : null]}>Последний</Text>
							</Pressable>
						</View>
					</View>

					{/* HOUSE TYPE */}
					<Text style={css.title}>Тип дома</Text>
					<View style={[css.viewPickerBase, css.viewPickerHouseType]}>
						<Picker style={css.picker} selectedValue={f_HouseType} onValueChange={(itemValue) => setf_HouseType(itemValue)}>
							<Picker.Item label="-- выбрать --" value="0" />
							<Picker.Item label="Кирпичный" value="1" />
							<Picker.Item label="Панельный" value="2" />
							<Picker.Item label="Деревянный" value="3" />
							<Picker.Item label="Монолитный" value="4" />
						</Picker>
					</View>

					{/* MORTGAGE CHECKBOX */}
					<Pressable style={css.checkBox} onPress={() => setmortgage(mortgage ? '' : 1)}>
						<CheckBox disabled={false} value={Boolean(mortgage)} onValueChange={(newValue) => setmortgage(mortgage ? '' : '1')} />
						<Text style={css.checkBoxText}>Подходит под ипотеку</Text>
					</Pressable>

					{/* VIDEO CHECKBOX */}
					<Pressable style={css.checkBox} onPress={() => setvideo(video ? '' : '1')}>
						<CheckBox disabled={false} value={Boolean(video)} onValueChange={() => setvideo(video ? '' : '1')} />
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
