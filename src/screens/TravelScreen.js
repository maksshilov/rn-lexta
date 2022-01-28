import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import Header from '../components/Header'
import * as Location from 'expo-location'
// import { Map, YMaps } from 'react-yandex-maps'
// import YaMap, { Marker } from 'react-native-yamap'
import css from '../styles/cssTravelScreen'

import { colors, fonts } from '../styles/constants'
import MapMark from '../components/MapMark'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function TravelScreen({ navigation }) {
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

	return (
		<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
			<Header navigation={navigation} scrollY={scrollY} />
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
				<Text style={{ fontFamily: fonts.bold, fontSize: 20 }}>Путешествуй по России с ЛЕ</Text>
				<Text style={{ fontFamily: fonts.bold, fontSize: 20, color: colors.red }}>Х</Text>
				<Text style={{ fontFamily: fonts.bold, fontSize: 20 }}>ТА</Text>
			</View>
			{/* <TouchableOpacity onPress={getLoc}>
				<Text>GetLoc</Text>
			</TouchableOpacity> */}

			<View style={{ width: windowWidth, height: windowWidth * 0.85 }}>
				{mapToggle && <MapMark reverse latitude={latitude} longtitude={longtitude} />}
			</View>
			<View style={css.cityInputWrapper}>
				<TextInput
					style={css.cityInputText}
					placeholder="Укажите город или регион"
					// value={cityOrRegion}
					// onChangeText={(value) => inputChangeHandler('cityOrRegion', value)}
				/>
			</View>
			<View style={css.btnsWrapper}>
				<Pressable
					// onPress={() => inputChangeHandler('objectType', 1)}
					style={css.btn}
				>
					<Text style={css.btnTitle}>Турбаза</Text>
				</Pressable>
				<Pressable
					// onPress={() => inputChangeHandler('objectType', 1)}
					style={css.btn}
				>
					<Text style={css.btnTitle}>Отель</Text>
				</Pressable>
			</View>
			<View style={css.btnsWrapper}>
				<Pressable
					// onPress={() => inputChangeHandler('objectType', 1)}
					style={css.btn}
				>
					<Text style={css.btnTitle}>Готиница</Text>
				</Pressable>
				<Pressable
					// onPress={() => inputChangeHandler('objectType', 1)}
					style={css.btn}
				>
					<Text style={css.btnTitle}>База Отдыха</Text>
				</Pressable>
			</View>
			<View style={css.btnsWrapper}>
				<Pressable
					// onPress={() => inputChangeHandler('objectType', 1)}
					style={[css.btn, { width: windowWidth * 0.94 }]}
				>
					<Text style={css.btnTitle}>Квартиры на сутки</Text>
				</Pressable>
			</View>
			<View style={css.btnSearch}>
				<Text style={css.btnSearchTitle}>Найти</Text>
			</View>
		</ScrollView>
	)
}
