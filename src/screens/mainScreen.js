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
import { colors, fonts } from '../styles/constants'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MainScreen({ navigation }) {
	const dispatch = useDispatch()

	const popObjects = useSelector((state) => state.popObjects)
	const popObjectsComponent = popObjects.length ? (
		<React.Fragment>
			<View>
				<ObjectMini item={popObjects[0]} navigation={navigation} />
				<ObjectMini item={popObjects[1]} navigation={navigation} />
			</View>
			<View>
				<ObjectMini item={popObjects[2]} navigation={navigation} />
				<ObjectMini item={popObjects[4]} navigation={navigation} />
			</View>
		</React.Fragment>
	) : null

	const handleGetObjects = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const { Email, Token, UserId, expirationDate } = JSON.parse(userData)

		const lexta = new LextaService()
		lexta
			.getSearchObjects(`token=${Token}&user=${md5(Email)}&recNum=20&curPos=0`)
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

	const [news, setNews] = useState()
	const newsComponent = news ? (
		<View style={[styles.popularAndNewsView, { flexDirection: 'column' }]}>
			<News date={news[0].Created.split(' ')[0].split('-').reverse().join('.')} title={news[0].Name} />
			<View style={{ height: 1, width: windowWidth * 0.94, backgroundColor: colors.grey, marginVertical: 15 }}></View>
			<News date={news[1].Created.split(' ')[0].split('-').reverse().join('.')} title={news[1].Name} />
			<View style={{ height: 1, width: windowWidth * 0.94, backgroundColor: colors.grey, marginVertical: 15 }}></View>
			<News date={news[2].Created.split(' ')[0].split('-').reverse().join('.')} title={news[2].Name} />
			<View style={{ height: 1, width: windowWidth * 0.94, backgroundColor: colors.grey, marginVertical: 15 }}></View>
			<News date={news[3].Created.split(' ')[0].split('-').reverse().join('.')} title={news[3].Name} />
			{/* <TouchableOpacity>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						marginVertical: 10,
						width: windowWidth * 0.5,
						height: windowWidth * 0.1,
						backgroundColor: '#fff',
						borderWidth: 2,
						borderColor: colors.red,
						borderRadius: 10,
					}}
				>
					<Text style={{ fontFamily: fonts.bold, color: colors.red }}>Все новости</Text>
				</View>
			</TouchableOpacity> */}
		</View>
	) : null
	const handleGetNews = async () => {
		const lexta = new LextaService()
		lexta
			.getNews(4, 0)
			.then((res) => res.json())
			.then((json) => {
				setNews(json.data)
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		handleGetObjects()
		handleGetNews()
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
					<SubHeader title="Жильё на любой вкус" navigation={() => navigation.navigate('Tab', { screen: 'search' })} />
					<Carousel navigation={navigation} />
				</View>
				{/* MAP */}
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Elements', { screen: 'Travel' })
						}}
					>
						<Image source={require('../../assets/map.png')} style={{ width: windowWidth * 0.95, height: 200 }} resizeMode="contain" />
					</TouchableOpacity>
				</View>
				{/* ПОПУЛЯРНО В ВАШЕМ ГОРОДЕ */}
				<View>
					<SubHeader title="Популярное в Вашем городе" navigation={() => {}} />
					<View style={styles.popularAndNewsView}>{popObjectsComponent}</View>
				</View>
				{/* NEWS */}
				<View>
					<SubHeader title="Новости" navigation={() => navigation.navigate('Elements', { screen: 'News' })} />
					{newsComponent}
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
