import React, { useRef, useState } from 'react'
import {
	Button,
	Dimensions,
	Pressable,
	Text,
	TextInput,
	View,
	Animated,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
	Modal,
	Alert,
} from 'react-native'
import Header from '../components/Header'
import { Picker } from '@react-native-picker/picker'
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { TokenConsumer } from '../components/tokenContext'
import { numSplit } from '../components/scripts'
import store from '../store'
import md5 from 'md5'
import PhoneShow from '../components/PhoneShow'
import ObjectCarouselSearch from '../components/ObjectCarouselSearch'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LextaService from '../services/LextaService'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

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

	const [result, setResult] = useState([])

	const [dataSourceCords, setDataSourceCords] = useState([])
	const [ref, setRef] = useState(null)

	const [modalVisible, setModalVisible] = useState(false)
	const [like, setLike] = useState(false)

	let params = `
	token=${store.getState().reducerUser.Token}&
	user=${md5(store.getState().reducerUser.Email)}&
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

	const scrollHandler = () => {
		setTimeout(() => {
			ref.scrollTo({
				x: 0,
				y: dataSourceCords,
				animated: true,
			})
		}, 500)
	}

	const handleSearch = async () => {
		lextaService = new LextaService()
		lextaService
			.getSearchObjects(params)
			.then((res) => res.json())
			.then((result) => navigation.navigate('SearchResult', { result }))
			.catch((err) => console.log(err))
	}

	const renderItem = ({ item }) => (
		<View style={{ width: windowWidth, alignItems: 'center' }}>
			<TouchableOpacity
				onPress={() => {
					console.log(item)
					navigation.navigate('Object', {
						item,
					})
				}}
				android_ripple
				activeOpacity={0.5}
				key={item.Message_ID}
				style={{
					backgroundColor: '#fff',
					elevation: 5,
					width: windowWidth * 0.88,
					marginBottom: 20,
				}}
			>
				{/* <ObjectCarouselSearch imgArray={item.Img} /> */}
				<View>
					<Image
						source={{ uri: `https://lexta.pro${item.Img[0]}` }}
						style={{ width: windowWidth * 0.88, height: windowWidth * 0.88 }}
						resizeMethod="scale"
					/>
				</View>
				<View style={{ paddingHorizontal: 10 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontFamily: 'gothampro-bold',
								fontSize: 20,
								marginVertical: 10,
							}}
						>
							{numSplit(item.Price)} руб.
						</Text>
						<MaterialCommunityIcons
							onPress={() => {
								// setLike(!like)
								// lextaService = new LextaService()
								// lextaService.setLikeUnlike()
							}}
							name={like ? 'heart' : 'heart-outline'}
							color="#912e33"
							size={25}
							style={{ marginRight: 5 }}
						/>
					</View>
					<Text
						style={{
							fontFamily: 'gothampro-regular',
							fontSize: 15,
							lineHeight: 20,
							marginBottom: 20,
						}}
					>
						{item.Name}, {item.ObjectType}
						{'\n'}
						{item.TotalArea} м2,{'\n'}
						{item.Floor}/{item.FloorsInHouse} эт.
					</Text>
					<Text
						style={{
							fontFamily: 'gothampro-regular',
							fontSize: 15,
							lineHeight: 20,
							marginBottom: 20,
						}}
					>
						{item.City}, {item.Region}
						{'\n'}
						{item.Street}, {item.HouseNumber}
					</Text>
				</View>
				<PhoneShow phoneNumber={item.Phone} />
			</TouchableOpacity>
		</View>
	)

	const scrollY = React.useRef(new Animated.Value(0)).current

	return (
		<React.Fragment>
			<Header navigation={navigation} scrollY={scrollY} />

			<ScrollView
				ref={(ref) => setRef(ref)}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
					useNativeDriver: false,
				})}
				contentContainerStyle={{
					// paddingTop: 25,
					paddingBottom: 25,
					backgroundColor: '#fff',
					alignItems: 'center',
				}}
				style={{ width: windowWidth }}
			>
				<TokenConsumer>
					{(token) => {
						return (
							<View>
								<View
									onLayout={(event) => {
										const layout = event.nativeEvent.layout
										console.log(layout.height)
										setDataSourceCords(layout.height)
									}}
								>
									<View>
										<View
											style={{
												...styles.textInput,
												width: windowWidth * 0.88,
												height: windowWidth * 0.1,
												borderTopLeftRadius: 10,
												borderTopRightRadius: 10,
												borderBottomWidth: 0,
											}}
										>
											<TextInput
												placeholder="Укажите город или регион"
												value={cityOrRegion}
												onChangeText={(value) => setcityOrRegion(value)}
											/>
										</View>
										<View
											style={{
												flexDirection: 'row',
												width: windowWidth * 0.88,
												height: windowWidth * 0.1,
												borderWidth: 1,
												borderColor: '#868686',
											}}
										>
											<Picker
												style={{
													width: windowWidth * 0.88,
													height: windowWidth * 0.1,
												}}
												selectedValue={catalogType}
												onValueChange={(itemValue) =>
													setcatalogType(itemValue)
												}
											>
												<Picker.Item label="Продажа" value="1" />
												<Picker.Item label="Аренда" value="2" />
											</Picker>
										</View>
										<View
											style={{
												flexDirection: 'row',
												width: windowWidth * 0.88,
												height: windowWidth * 0.1,
												borderWidth: 1,
												borderTopWidth: 0,
												borderBottomWidth: 0,
												borderColor: '#868686',
											}}
										>
											<Picker
												style={{
													width: windowWidth * 0.88,
													height: windowWidth * 0.1,
												}}
												selectedValue={f_Category}
												onValueChange={(itemValue) =>
													setf_Category(itemValue)
												}
											>
												<Picker.Item label="Категория" value="0" />
												<Picker.Item label="Комнаты" value="1" />
												<Picker.Item label="Квартиры" value="2" />
												<Picker.Item label="Дачи" value="3" />
												<Picker.Item label="Дома" value="4" />
												<Picker.Item label="Коттеджи" value="5" />
												<Picker.Item label="Таунхаусы" value="6" />
											</Picker>
										</View>
										<View
											style={{
												flexDirection: 'row',
												width: windowWidth * 0.88,
												height: windowWidth * 0.1,
												borderWidth: 1,
												borderBottomLeftRadius: 10,
												borderBottomRightRadius: 10,

												borderColor: '#868686',
												marginBottom: 20,
											}}
										>
											<Picker
												style={{
													width: windowWidth * 0.88,
													height: windowWidth * 0.1,
												}}
												selectedValue={f_NumberRooms}
												onValueChange={(itemValue) =>
													setf_NumberRooms(itemValue)
												}
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
									<Text style={styles.title}>Вид объекта</Text>
									<View style={{ flexDirection: 'row' }}>
										<Pressable
											onPress={() => setobjectType(1)}
											style={[
												styles.select,
												{
													width: windowWidth * 0.18,
													height: windowWidth * 0.1,
													borderTopLeftRadius: 10,
													borderBottomLeftRadius: 10,
													borderRightWidth: 0,
												},
												objectType === 1 ? styles.selected : null,
											]}
										>
											<Text
												style={[
													styles.selectText,
													objectType === 1 ? styles.selectedText : null,
												]}
											>
												Все
											</Text>
										</Pressable>
										<Pressable
											onPress={() => setobjectType(3)}
											style={[
												styles.select,
												{
													width: windowWidth * 0.38,
													height: windowWidth * 0.1,
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
													width: windowWidth * 0.32,
													height: windowWidth * 0.1,
													borderTopRightRadius: 10,
													borderBottomRightRadius: 10,
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
												width: windowWidth * 0.38,
												height: windowWidth * 0.1,
												borderTopWidth: 1,
												borderBottomWidth: 1,
												borderRightWidth: 0,
											}}
										/>

										<View style={styles.units}>
											<Text>руб.</Text>
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
												width: windowWidth * 0.38,
												height: windowWidth * 0.1,
												borderTopWidth: 1,
												borderBottomWidth: 1,
												borderRightWidth: 0,
											}}
										/>

										<View style={styles.units}>
											<Text>м2</Text>
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
												width: windowWidth * 0.38,
												height: windowWidth * 0.1,
												borderTopWidth: 1,
												borderBottomWidth: 1,
												borderRightWidth: 0,
											}}
										/>

										<View style={styles.units}>
											<Text>м2</Text>
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
											onValueChange={(newValue) =>
												setmortgage(mortgage ? '' : '1')
											}
										/>
										<Text style={styles.checkBoxText}>
											Подходит под ипотеку
										</Text>
									</Pressable>

									{/* VIDEO CHECKBOX */}
									<Pressable
										style={styles.checkBox}
										onPress={() => setvideo(video ? '' : '1')}
									>
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

								{/* SEARCH RESULTS */}
								{/* <SafeAreaView>
									<FlatList
										data={result}
										renderItem={renderItem}
										keyExtractor={(item) => item.Message_ID}
									/>
								</SafeAreaView> */}
							</View>
						)
					}}
				</TokenConsumer>
				{/* <Main /> */}
			</ScrollView>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
			>
				<View style={{ alignItems: 'center' }}>
					<View>
						<Text
							style={{
								fontFamily: 'gothampro-bold',
								fontSize: 15,
								marginVertical: 20,
								textAlign: 'center',
							}}
						>
							Найдено {result.length} объявление
						</Text>
					</View>

					<FlatList
						data={result}
						renderItem={renderItem}
						keyExtractor={(item) => item.Message_ID}
					/>
				</View>
			</Modal>
		</React.Fragment>
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
