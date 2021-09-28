import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker'
import { Dimensions, TextInput, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// import { TextInput } from 'react-native-paper'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function AddObject() {
	const [f_ObjectType, setf_ObjectType] = useState(0)
	const [f_Type, setf_Type] = useState(0)
	const [f_LeaseType, setf_LeaseType] = useState(0)
	const [f_TravelType, setf_TravelType] = useState(0)
	const [f_Category, setf_Category] = useState(0)
	const [f_NumberRooms, setf_NumberRooms] = useState(0)
	const [f_Description, setf_Description] = useState('')
	const [f_Region, setf_Region] = useState('')
	const [f_City, setf_City] = useState('')
	const [f_Street, setf_Street] = useState('')
	const [f_HouseNumber, setf_HouseNumber] = useState('')
	const [f_TypeProperty, setf_TypeProperty] = useState()
	const [f_Latitude, setf_Latitude] = useState()
	const [f_Longitude, setf_Longitude] = useState()
	const [f_Price, setf_Price] = useState()
	const [f_Finishing, setf_Finishing] = useState()
	const [f_TotalArea, setf_TotalArea] = useState()
	const [f_KitchenArea, setf_KitchenArea] = useState()
	const [f_LivingArea, setf_LivingArea] = useState()
	const [f_Floor, setf_Floor] = useState()
	const [f_FloorsInHouse, setf_FloorsInHouse] = useState()
	const [f_FirstFloorType, setf_FirstFloorType] = useState()
	const [f_HouseType, setf_HouseType] = useState()
	const [f_Bathroom, setf_Bathroom] = useState()
	const [f_Window, setf_Window] = useState()
	const [f_BalconyType, setf_BalconyType] = useState()
	const [f_Elevator, setf_Elevator] = useState()
	const [f_Parking, setf_Parking] = useState()
	const [f_TypeSale, setf_TypeSale] = useState()
	const [f_OfferFrom, setf_OfferFrom] = useState()
	const [f_YearBuilt, setf_YearBuilt] = useState()
	const [f_Video, setf_Video] = useState()
	const [f_Phone, setf_Phone] = useState()
	const [f_CadastralNumber, setf_CadastralNumber] = useState()
	const [f_Mortgage, setf_Mortgage] = useState('')

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
							onPress={() => setf_ObjectType(1)}
							style={[
								styles.select,
								{
									width: windowWidth * 0.44,
									height: windowWidth * 0.1,
									borderTopLeftRadius: 10,
									borderBottomLeftRadius: 10,
									borderTopWidth: 1,
									borderBottomWidth: 1,
									borderRightWidth: 0,
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
									width: windowWidth * 0.44,
									height: windowWidth * 0.1,
									borderTopRightRadius: 10,
									borderBottomRightRadius: 10,
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

					{/* DEAL & RENT TYPE */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44, paddingRight: 3 }}>
							<Text style={styles.title}>Тип сделки</Text>
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
									selectedValue={f_Type}
									onValueChange={(itemValue) => setf_Type(itemValue)}
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
									selectedValue={f_LeaseType}
									onValueChange={(itemValue) => setf_LeaseType(itemValue)}
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
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Категория</Text>
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
									selectedValue={f_Category}
									onValueChange={(itemValue) => setf_Category(itemValue)}
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
							value={f_Description}
							onChangeText={(value) => setf_Description(value)}
							placeholder="Описание"
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
								value={f_Region}
								onChangeText={(value) => setf_Region(value)}
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
								value={f_City}
								onChangeText={(value) => setf_City(value)}
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
								value={f_Street}
								onChangeText={(value) => setf_Street(value)}
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
								value={f_HouseNumber}
								onChangeText={(value) => setf_HouseNumber(value)}
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

					{/* PROPERTY TYPE */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.88 }}>
							<Text style={styles.title}>Тип недвижимости</Text>
							<TextInput
								value={f_TypeProperty}
								onChangeText={(value) => setf_TypeProperty(value)}
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
								value={'111'}
								onChangeText={() => {}}
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
							value={f_Price}
							onChangeText={(value) => setf_Price(value)}
							placeholder="от"
							keyboardType="number-pad"
							style={{
								...styles.textInput,
								...styles.textInputInput,
								width: windowWidth * 0.76,
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

					{/* FINISHING */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.88, paddingRight: 3 }}>
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

					{/* AREA  */}
					<View>
						<Text style={{ ...styles.title, marginBottom: 5 }}>Площадь</Text>

						<View style={{ flexDirection: 'row', marginBottom: 20 }}>
							<View style={{ width: windowWidth * 0.29 }}>
								<Text style={styles.title}>Общая</Text>
								<TextInput
									value={f_TotalArea}
									onChangeText={(value) => setf_TotalArea(value)}
									placeholder="Общая"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.29,
										height: windowWidth * 0.1,
										borderTopLeftRadius: 10,
										borderBottomLeftRadius: 10,
									}}
								/>
							</View>
							<View style={{ width: windowWidth * 0.3 }}>
								<Text style={styles.title}>Кухни</Text>
								<TextInput
									value={f_KitchenArea}
									onChangeText={(value) => setf_KitchenArea(value)}
									placeholder="Кухни"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.3,
										height: windowWidth * 0.1,
										borderWidth: 0,
										borderTopWidth: 1,
										borderBottomWidth: 1,
									}}
								/>
							</View>
							<View style={{ width: windowWidth * 0.29 }}>
								<Text style={styles.title}>Жилая</Text>
								<TextInput
									value={f_LivingArea}
									onChangeText={(value) => setf_LivingArea(value)}
									placeholder="Жилая"
									keyboardType="number-pad"
									style={{
										...styles.textInput,
										...styles.textInputInput,
										width: windowWidth * 0.29,
										height: windowWidth * 0.1,
										borderTopRightRadius: 10,
										borderBottomRightRadius: 10,
									}}
								/>
							</View>
						</View>
					</View>

					{/*  FLOOR */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44 }}>
							<Text style={styles.title}>Этаж</Text>
							<TextInput
								value={f_Floor}
								onChangeText={(value) => setf_Floor(value)}
								placeholder="Этаж"
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
							<Text style={styles.title}>Этажей в доме</Text>
							<TextInput
								value={f_FloorsInHouse}
								onChangeText={(value) => setf_FloorsInHouse(value)}
								placeholder="Этажей в доме"
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

					{/* FIRST FLOOR / HOUSE TYPE */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44, paddingRight: 3 }}>
							<Text style={styles.title}>Первый этаж</Text>
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
						<View style={{ width: windowWidth * 0.44 }}>
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
					</View>

					{/* TOILET  */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.88, paddingRight: 3 }}>
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

					{/* WNDOWS / BALCONY */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44, paddingRight: 3 }}>
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
						<View style={{ width: windowWidth * 0.44 }}>
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
					</View>

					{/* ELEVATOR / PARKING */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44, paddingRight: 3 }}>
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
						<View style={{ width: windowWidth * 0.44 }}>
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
					</View>

					{/* SALE TYPE / SELLER */}
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ width: windowWidth * 0.44, paddingRight: 3 }}>
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
						<View style={{ width: windowWidth * 0.44 }}>
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
					</View>

					{/* YEAR */}
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
								width: windowWidth * 0.88,
								height: windowWidth * 0.1,
								borderRadius: 10,
							}}
						/>
					</View>

					{/* YOUTUBE */}
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
								width: windowWidth * 0.88,
								height: windowWidth * 0.1,
								borderRadius: 10,
							}}
						/>
					</View>

					{/* `PHONE` */}
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
								width: windowWidth * 0.88,
								height: windowWidth * 0.1,
								borderRadius: 10,
							}}
						/>
					</View>

					{/* KADASTR */}
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
								width: windowWidth * 0.88,
								height: windowWidth * 0.1,
								borderRadius: 10,
							}}
						/>
					</View>

					{/* MORTGAGE CHECKBOX */}
					<Pressable
						style={styles.checkBox}
						onPress={() => setf_Mortgage(f_Mortgage ? '' : 1)}
					>
						<CheckBox
							disabled={false}
							value={Boolean(f_Mortgage)}
							onValueChange={(newValue) => setf_Mortgage(f_Mortgage ? '' : '1')}
						/>
						<Text style={styles.checkBoxText}>Подходит под ипотеку</Text>
					</Pressable>

					{/* Button ADD */}
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
							onPress={() => console.log('Button ДОБАВИТЬ')}
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
