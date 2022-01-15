import React, { useEffect, useState } from 'react'
import { Image, View, Dimensions, Animated, Pressable, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Carousel from '../components/Carousel'
import ObjectMini from '../components/ObjectMini'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'
import News from '../components/News'
import { shuffle } from '../components/scripts'
import LextaService from '../services/LextaService'
import md5 from 'md5'
import { useDispatch, useSelector } from 'react-redux'
import { SET_POP_OBJECTS } from '../store/actions/popObjects'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MainScreen({ navigation }) {
	const dispatch = useDispatch()

	const popObjects = useSelector((state) => state.popObjects)
	const popObjectsVar = popObjects.length ? (
		<React.Fragment>
			<ObjectMini item={popObjects[0]} navigation={navigation} />
			<ObjectMini item={popObjects[1]} navigation={navigation} />
		</React.Fragment>
	) : null

	const getObjects = async () => {
		const userData = await AsyncStorage.getItem('userData')
		console.log('userData', userData)
		const { Email, Token, UserId, expirationDate } = JSON.parse(userData)

		// let params = `
		// token=${Token}&user=${md5(Email)}&recNum=5&curPos=0
		// `
		const lexta = new LextaService()
		lexta
			.getSearchObjects(`token=${Token}&user=${md5(Email)}&recNum=5&curPos=0`)
			.then((res) => res.json())
			.then((json) => {
				const idxs = shuffle(Array.from({ length: json.length }).map((_, i) => i))
				let popular = []
				for (let i = 0; i < json.length; i++) {
					popular.push(json[idxs[i]])
				}
				dispatch({
					type: SET_POP_OBJECTS,
					popObjects: popular,
				})
			})
			.catch((e) => console.log(e))
	}

	useEffect(() => {
		getObjects()
	}, [])

	const scrollY = React.useRef(new Animated.Value(0)).current

	return (
		<>
			{/* HEADER */}
			<Header navigation={navigation} scrollY={scrollY} />
			<ScrollView
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
					useNativeDriver: false,
				})}
				style={{ backgroundColor: '#fff' }}
			>
				{/* ЖИЛЬЁ НА ЛЮБОЙ ВКУС */}

				<View>
					<SubHeader title="Жильё на любой вкус" />
					<Carousel navigation={navigation} />
				</View>
				{/* MAP */}
				<View style={{ alignItems: 'center' }}>
					<Image source={require('../../assets/map.png')} style={{ width: windowWidth * 0.95, height: 200 }} resizeMode="contain" />
				</View>
				{/* ПОПУЛЯРНО В ВАШЕМ ГОРОДЕ */}
				<View style={{ marginBottom: 40 }}>
					<SubHeader title="Популярное в Вашем городе" />
					<View style={styles.popularAndNewsView}>{popObjectsVar}</View>
				</View>
				{/* NEWS */}
				<View>
					<SubHeader title="Новости" navigation={navigation} />
					<View style={styles.popularAndNewsView}>
						<News date="30.02.2036" title="Lorem, ipsum dolor sit amet consectetur adipisicing elit." />

						<View style={{ width: 1, backgroundColor: 'grey' }}></View>
						<News date="31.02.2036" title="Lorem, ipsum dolor sit amet consectetur adipisicing elit." />
					</View>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	popularAndNewsView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		marginBottom: 10,
	},
})
