import React, { Fragment, useEffect, useReducer, useState } from 'react'
import { ActivityIndicator, Animated, Dimensions, FlatList, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import Header from '../components/Header'
import * as Location from 'expo-location'
// import { Map, YMaps } from 'react-yandex-maps'
// import YaMap, { Marker } from 'react-native-yamap'
import css from '../styles/cssTravelScreen'

import { colors, fonts } from '../styles/constants'
import MapMark from '../components/MapMark'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import ObjectCard from '../components/ObjectCard'
import md5 from 'md5'
import LextaService from '../services/LextaService'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

let lexta = new LextaService()

const SET_BTN_OPTIONS = 'SET_BTN_OPTIONS'
const formReducer = (state, action) => {
	switch (action.type) {
		case SET_BTN_OPTIONS:
			return {
				...state,
				[action.input]: action.value,
			}

		default:
			return state
	}
}

export default function TravelScreen({ navigation }) {
	const [formState, dispatchFormState] = useReducer(formReducer, {
		cityOrRegion: '',
		tourbase: false,
		hotel: false,
		guest: false,
		restbase: false,
		appartments: false,
	})

	let { cityOrRegion, tourbase, hotel, guest, restbase, appartments } = formState

	const inputChangeHandler = (inputIdentifier, inputValue) => {
		dispatchFormState({
			type: SET_BTN_OPTIONS,
			input: inputIdentifier,
			value: inputValue,
		})
	}

	const scrollY = React.useRef(new Animated.Value(0)).current

	const [mapToggle, setMapToggle] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)
	const [latitude, setlatitude] = useState('55.45')
	const [longtitude, setlongtitude] = useState('37.36')

	const getLoc = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied')
			return
		}

		let location = await Location.getCurrentPositionAsync({})
		setlatitude(location.coords.latitude)
		setlongtitude(location.coords.longitude)
	}

	useEffect(() => {
		getLoc()

		clearTimeout(mapTimeout)
		const mapTimeout = setTimeout(() => {
			setMapToggle(true)
		}, 1000)
	}, [])

	const [loading, setLoading] = useState(false)
	const [dataSource, setDataSource] = useState([])
	const [curPos, setCurPos] = useState(0)
	const [isListEnd, setIsListEnd] = useState(false)
	const [searching, setSearching] = useState(false)
	const getData = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const { Email, Token } = JSON.parse(userData)

		let params = `
			token=${Token}&
			user=${md5(Email)}&
			cityOrRegion=${cityOrRegion}&
			travelType1=${tourbase ? '1' : ''}&
			travelType2=${hotel ? '2' : ''}&
			travelType3=${guest ? '3' : ''}&
			travelType4=${restbase ? '4' : ''}&
			leaseType=${appartments ? '2' : ''}&
			recNum=5&
			curPos=${curPos}
			`
		// similar=1&
		// ​​travel=1&
		// ​​catalogType=2&
		console.log('loading', loading)
		console.log('isListEnd', isListEnd)

		if (!loading && !isListEnd) {
			// пофиксить isListEnd - проходит проверку только первый раз.
			// вроде всё ок. надо мониторить
			setLoading(true)
			lexta
				.getSearchObjects(params)
				.then((response) => response.json())
				.then((responseJson) => {
					console.log('TravelScreen.js > getData() > getSearchObject > responseJson.length ', responseJson.length)
					if (responseJson.length > 0) {
						setCurPos(curPos + 5)
						setDataSource([...dataSource, ...responseJson])
						setLoading(false)
						setSearching(true)
					} else {
						setIsListEnd(true)
						setLoading(false)
					}
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}
	const renderFooter = () => {
		return (
			<View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
				{loading ? <ActivityIndicator color="black" style={{ margin: 15 }} /> : null}
			</View>
		)
	}

	let userFavorites = useSelector((state) => state.profile.Favorites)
	userFavorites = JSON.parse(userFavorites)

	const RenderItem = React.memo(function renderItem({ data }) {
		return <ObjectCard item={data} userFavorites={userFavorites} navigation={navigation} />
	})

	return (
		<Fragment>
			<Header navigation={navigation} scrollY={scrollY} />
			<ScrollView contentContainerStyle={{ backgroundColor: '#fff', alignItems: 'center' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
					<Text style={{ fontFamily: fonts.bold, fontSize: 20 }}>Путешествуй по России с ЛЕ</Text>
					<Text style={{ fontFamily: fonts.bold, fontSize: 20, color: colors.red }}>Х</Text>
					<Text style={{ fontFamily: fonts.bold, fontSize: 20 }}>ТА</Text>
				</View>
				{/* <TouchableOpacity onPress={getLoc}>
					<Text>GetLoc</Text>
				</TouchableOpacity> */}
				<View style={{ width: windowWidth, height: windowWidth * 0.85 }}>
					{mapToggle ? (
						<MapMark reverse latitude={latitude} longtitude={longtitude} />
					) : (
						<ActivityIndicator color={colors.red} size="large" />
					)}
				</View>
				<View style={css.cityInputWrapper}>
					<TextInput
						style={css.cityInputText}
						placeholder="Укажите город или регион"
						value={cityOrRegion}
						onChangeText={(value) => inputChangeHandler('cityOrRegion', value)}
					/>
				</View>
				<View style={css.btnsWrapper}>
					<Pressable
						onPress={() => inputChangeHandler('tourbase', !tourbase)}
						style={[css.btn, tourbase && { backgroundColor: '#acacac' }]}
					>
						<Text style={css.btnTitle}>Турбаза</Text>
					</Pressable>
					<Pressable onPress={() => inputChangeHandler('hotel', !hotel)} style={[css.btn, hotel && { backgroundColor: '#acacac' }]}>
						<Text style={css.btnTitle}>Отель</Text>
					</Pressable>
				</View>
				<View style={css.btnsWrapper}>
					<Pressable onPress={() => inputChangeHandler('guest', !guest)} style={[css.btn, guest && { backgroundColor: '#acacac' }]}>
						<Text style={css.btnTitle}>Готиница</Text>
					</Pressable>
					<Pressable
						onPress={() => inputChangeHandler('restbase', !restbase)}
						style={[css.btn, restbase && { backgroundColor: '#acacac' }]}
					>
						<Text style={css.btnTitle}>База Отдыха</Text>
					</Pressable>
				</View>
				<View style={css.btnsWrapper}>
					<Pressable
						onPress={() => inputChangeHandler('appartments', !appartments)}
						style={[css.btn, appartments && { backgroundColor: '#acacac' }, { width: windowWidth * 0.94 }]}
					>
						<Text style={css.btnTitle}>Квартиры на сутки</Text>
					</Pressable>
				</View>
				<TouchableOpacity
					onPress={getData}
					onLongPress={() => {
						setIsListEnd(false)
						setLoading(false)
						setSearching(false)
					}}
					style={css.btnSearch}
				>
					<Text style={css.btnSearchTitle}>Найти</Text>
				</TouchableOpacity>
				{searching && (
					<View style={{ height: windowHeight * 1, width: windowWidth, marginTop: 10 }}>
						<FlatList
							nestedScrollEnabled
							data={dataSource}
							renderItem={({ item }) => <RenderItem data={item} />}
							keyExtractor={(item) => item.Message_ID}
							ListFooterComponent={renderFooter}
							onEndReached={getData}
							onEndReachedThreshold={0.5}
						/>
					</View>
				)}
			</ScrollView>
		</Fragment>
	)
}
