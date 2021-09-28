import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker'
import { Dimensions, TextInput, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// import { TextInput } from 'react-native-paper'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function AddObject() {
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
					{/* OBJECT TYPE */}
					<View style={{ flexDirection: 'row' }}>
						<Pressable
							onPress={() => setobjectType(3)}
							style={[
								styles.select,
								{
									width: windowWidth * 0.44,
									height: windowWidth * 0.1,
									borderTopLeftRadius: 5,
									borderBottomLeftRadius: 5,
									borderTopWidth: 1,
									borderBottomWidth: 1,
									borderRightWidth: 0,
								},
								objectType === 3 ? styles.selected : null,
							]}
						>
							<Text
								style={[
									styles.selectText,
									objectType === 3 ? styles.selectedText : null,
								]}
							>
								Новостройка
							</Text>
						</Pressable>
						<Pressable
							onPress={() => setobjectType(2)}
							style={[
								styles.select,
								{
									width: windowWidth * 0.44,
									height: windowWidth * 0.1,
									borderTopRightRadius: 5,
									borderBottomRightRadius: 5,
								},
								objectType === 2 ? styles.selected : null,
							]}
						>
							<Text
								style={[
									styles.selectText,
									objectType === 2 ? styles.selectedText : null,
								]}
							>
								Вторичка
							</Text>
						</Pressable>
					</View>

					{/* DEAL & RENT TYPE */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44, paddingRight: 3 }}>
							<Text style={styles.title}>Тип сделки</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={catalogType}
									onValueChange={(itemValue) => setcatalogType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Продажа" value="1" />
									<Picker.Item label="Аренда" value="2" />
								</Picker>
							</View>
						</View>
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Тип аренды</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={catalogType}
									onValueChange={(itemValue) => setcatalogType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Длительная" value="1" />
									<Picker.Item label="Посуточная" value="2" />
								</Picker>
							</View>
						</View>
					</View>

					{/* OBJECT TYPE & CATEGORY */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44, paddingRight: 3 }}>
							<Text style={styles.title}>Тип объекта</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={catalogType}
									onValueChange={(itemValue) => setcatalogType(itemValue)}
								>
									<Picker.Item label="-- выбрать --" value="0" />
									<Picker.Item label="Турбаза" value="1" />
									<Picker.Item label="Отель" value="2" />
									<Picker.Item label="Гостиница" value="2" />
									<Picker.Item label="База отдыха" value="2" />
								</Picker>
							</View>
						</View>
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Категория</Text>
							<View
								style={{
									height: windowWidth * 0.1,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: '#868686',
								}}
							>
								<Picker
									style={{
										fontFamily: 'gothampro-regular',
										fontWeight: 'normal',
										height: windowWidth * 0.1,
									}}
									selectedValue={catalogType}
									onValueChange={(itemValue) => setcatalogType(itemValue)}
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
					</View>

					{/* ROOMS */}
					<View style={{ marginBottom: 20 }}>
						<Text style={styles.title}>Комнат</Text>

						<View
							style={{
								flexDirection: 'row',
								width: windowWidth * 0.88,
								height: windowWidth * 0.1,
								borderWidth: 1,
								borderRadius: 5,

								borderColor: '#868686',
							}}
						>
							<Picker
								style={{
									width: windowWidth * 0.88,
									height: windowWidth * 0.1,
								}}
								selectedValue={f_NumberRooms}
								onValueChange={(itemValue) => setf_NumberRooms(itemValue)}
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

					{/* DESCRIPTION */}
					<Text style={styles.title}>Описание</Text>
					<View style={{ marginBottom: 20 }}>
						<TextInput
							multiline
							value={priceTo}
							onChangeText={(value) => setpriceTo(value)}
							placeholder="до"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,
								paddingVertical: 5,
								textAlignVertical: 'top',
								width: windowWidth * 0.88,
								height: windowWidth * 0.3,
								borderWidth: 1,
								borderRadius: 10,
							}}
						/>
					</View>

					{/* REGION & CITY */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Регион</Text>
							<TextInput
								value={priceFrom}
								onChangeText={(value) => setpriceFrom(value)}
								placeholder="Регион"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.41,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Город</Text>
							<TextInput
								value={priceFrom}
								onChangeText={(value) => setpriceFrom(value)}
								placeholder="Город"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.44,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
					</View>

					{/* HOUSE NUMBER & HIGHWAY */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Улица</Text>
							<TextInput
								value={priceFrom}
								onChangeText={(value) => setpriceFrom(value)}
								placeholder="Улица"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.41,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Номер дома</Text>
							<TextInput
								value={priceFrom}
								onChangeText={(value) => setpriceFrom(value)}
								placeholder="Номер дома"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.44,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
					</View>

					{/* TYPE */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.88 }}>
							<Text style={styles.title}>Тип недвижимости</Text>
							<TextInput
								value={priceFrom}
								onChangeText={(value) => setpriceFrom(value)}
								placeholder="Тип недвижимости"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.88,
									height: windowWidth * 0.1,
									borderRadius: 10,
								}}
							/>
						</View>
					</View>

					{/* LOCATION */}

					<View>
						<Text style={styles.title}>Метка на карте</Text>
						<View
							style={{
								width: windowWidth * 0.88,
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginBottom: 20,
							}}
						>
							<TextInput
								value={priceFrom}
								onChangeText={(value) => setpriceFrom(value)}
								placeholder="Широта, долгота"
								keyboardType="number-pad"
								style={{
									...styles.textInput,
									...styles.textInputInput,
									width: windowWidth * 0.74,
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

					{/* PRICE */}
					<Text style={styles.title}>Цена</Text>
					<View style={{ flexDirection: 'row' }}>
						<TextInput
							value={priceFrom}
							onChangeText={(value) => setpriceFrom(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,
								width: windowWidth * 0.38,
								height: windowWidth * 0.1,
								borderTopLeftRadius: 10,
								borderBottomLeftRadius: 10,
								borderRightWidth: 0,
							}}
						/>
						<TextInput
							value={priceTo}
							onChangeText={(value) => setpriceTo(value)}
							placeholder="до"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,
								width: windowWidth * 0.38,
								height: windowWidth * 0.1,
								borderTopWidth: 1,
								borderBottomWidth: 1,
								borderRightWidth: 0,
							}}
						/>

						<View style={styles.units}>
							<Text style={{ fontFamily: 'gothampro-regular' }}>руб.</Text>
						</View>
					</View>

					{/* TOTAL AREA */}
					<Text style={styles.title}>Общая площадь</Text>
					<View style={{ flexDirection: 'row' }}>
						<TextInput
							value={totalAreaFrom}
							onChangeText={(value) => settotalAreaFrom(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,

								width: windowWidth * 0.38,
								height: windowWidth * 0.1,
								borderTopLeftRadius: 10,
								borderBottomLeftRadius: 10,
								borderRightWidth: 0,
							}}
						/>
						<TextInput
							value={totalAreaTo}
							onChangeText={(value) => settotalAreaTo(value)}
							placeholder="до"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,

								width: windowWidth * 0.38,
								height: windowWidth * 0.1,
								borderTopWidth: 1,
								borderBottomWidth: 1,
								borderRightWidth: 0,
							}}
						/>

						<View style={styles.units}>
							<Text style={{ fontFamily: 'gothampro-regular' }}>м2</Text>
						</View>
					</View>

					{/* KITCHEN AREA */}
					<Text style={styles.title}>Площадь кухни</Text>
					<View style={{ flexDirection: 'row' }}>
						<TextInput
							value={kitchenAreaFrom}
							onChangeText={(value) => setkitchenAreaFrom(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,

								width: windowWidth * 0.38,
								height: windowWidth * 0.1,
								borderTopLeftRadius: 10,
								borderBottomLeftRadius: 10,
								borderRightWidth: 0,
							}}
						/>
						<TextInput
							value={kitchenAreaTo}
							onChangeText={(value) => setkitchenAreaTo(value)}
							placeholder="до"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,

								width: windowWidth * 0.38,
								height: windowWidth * 0.1,
								borderTopWidth: 1,
								borderBottomWidth: 1,
								borderRightWidth: 0,
							}}
						/>

						<View style={styles.units}>
							<Text style={{ fontFamily: 'gothampro-regular' }}>м2</Text>
						</View>
					</View>

					{/* FLOOR */}
					<Text style={styles.title}>Этаж</Text>
					<View style={{ flexDirection: 'row' }}>
						<TextInput
							value={floorFrom}
							onChangeText={(value) => setfloorFrom(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								width: windowWidth * 0.44,
								height: windowWidth * 0.1,
								borderTopLeftRadius: 10,
							}}
						/>
						<TextInput
							value={floorTo}
							onChangeText={(value) => setfloorTo(value)}
							placeholder="до"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								width: windowWidth * 0.44,
								height: windowWidth * 0.1,
								borderTopRightRadius: 10,
								borderLeftWidth: 0,
							}}
						/>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Pressable
							onPress={() => setwhichFloor1(whichFloor1 ? '' : 1)}
							style={[
								styles.select,
								{
									width: windowWidth * 0.28,
									height: windowWidth * 0.1,
									borderBottomLeftRadius: 10,
									borderTopWidth: 0,
								},
								whichFloor1 ? styles.selected : null,
							]}
						>
							<Text
								style={[
									styles.selectText,
									whichFloor1 ? styles.selectedText : null,
								]}
							>
								Не первый
							</Text>
						</Pressable>
						<Pressable
							onPress={() => setwhichFloor2(whichFloor2 ? '' : 1)}
							style={[
								styles.select,
								{
									width: windowWidth * 0.33,
									height: windowWidth * 0.1,
									borderTopWidth: 0,
									borderLeftWidth: 0,
									borderRightWidth: 0,
								},
								whichFloor2 ? styles.selected : null,
							]}
						>
							<Text
								style={[
									styles.selectText,
									whichFloor2 ? styles.selectedText : null,
								]}
							>
								Не последний
							</Text>
						</Pressable>
						<Pressable
							onPress={() => setwhichFloor3(whichFloor3 ? '' : 1)}
							style={[
								styles.select,
								{
									width: windowWidth * 0.27,
									height: windowWidth * 0.1,
									borderBottomRightRadius: 10,
									borderTopWidth: 0,
								},
								whichFloor3 ? styles.selected : null,
							]}
						>
							<Text
								style={[
									styles.selectText,
									whichFloor3 ? styles.selectedText : null,
								]}
							>
								Последний
							</Text>
						</Pressable>
					</View>

					{/* HOUSE TYPE */}
					<Text style={styles.title}>Тип дома</Text>
					<View
						style={{
							flexDirection: 'row',
							width: windowWidth * 0.88,
							height: windowWidth * 0.1,
							borderRadius: 10,
							borderWidth: 1,
							borderColor: '#868686',
							marginBottom: 20,
						}}
					>
						<Picker
							style={{
								width: windowWidth * 0.88,
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
						</Picker>
					</View>

					{/* MORTGAGE CHECKBOX */}
					<Pressable
						style={styles.checkBox}
						onPress={() => setmortgage(mortgage ? '' : 1)}
					>
						<CheckBox
							disabled={false}
							value={Boolean(mortgage)}
							onValueChange={(newValue) => setmortgage(mortgage ? '' : '1')}
						/>
						<Text style={styles.checkBoxText}>Подходит под ипотеку</Text>
					</Pressable>

					{/* VIDEO CHECKBOX */}
					<Pressable style={styles.checkBox} onPress={() => setvideo(video ? '' : '1')}>
						<CheckBox
							disabled={false}
							value={Boolean(video)}
							onValueChange={() => setvideo(video ? '' : '1')}
						/>
						<Text style={styles.checkBoxText}>С видео</Text>
					</Pressable>
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
							onPress={() => handleSearch()}
						>
							<Text
								style={{
									color: '#fdfffc',
									fontFamily: 'gothampro-regular',
									fontSize: 18,
								}}
							>
								Показать
							</Text>
						</Pressable>
					</View>
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
