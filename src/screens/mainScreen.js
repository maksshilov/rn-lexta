import React, { useEffect, useState } from 'react'
import { Image, Text, View, Dimensions, Animated, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Carousel from '../components/carousel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ObjectMini from '../components/objectMini'
import Header from '../components/header'
import SubHeader from '../components/subHeader'
import News from '../components/news'
import { connect } from 'react-redux'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

const MainScreen = ({ state, navigation, setUserInfo, setObjects }) => {
	const { getItem } = useAsyncStorage('@storage_key')
	const getObjects = async () => {
		const item = await getItem()
		const itemToJson = JSON.parse(item)
		setUserInfo(itemToJson)
		await fetch(
			`https://lexta.pro/api/GetObjects.php?token=${itemToJson.Token}&user=${itemToJson.Email}`,
			{
				mode: 'no-cors',
			}
		)
			.then((res) => res.json())
			.then((json) => {
				const idxs = shuffle(Array.from({ length: json.length }).map((_, i) => i))
				let popular = []
				for (let i = 0; i < 2; i++) {
					popular.push(json[idxs[i]])
				}
				setObjects(popular)
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
				style={{
					backgroundColor: '#fff',
				}}
			>
				{/* ЖИЛЬЁ НА ЛЮБОЙ ВКУС */}
				<View>
					<SubHeader title="Жильё на любой вкус" />
					<Carousel />
				</View>
				{/* MAP */}
				<View style={{ alignItems: 'center' }}>
					<Image
						source={require('../../assets/map.png')}
						style={{ width: windowWidth * 0.95, height: 200 }}
						resizeMode="contain"
					/>
				</View>
				{/* ПОПУЛЯРНО В ВАШЕМ ГОРОДЕ */}
				<View style={{ marginBottom: 40 }}>
					<SubHeader title="Популярное в Вашем городе" />
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginLeft: 10,
							marginRight: 10,
							marginTop: 10,
							marginBottom: 10,
						}}
					>
						{Boolean(state.reducerObjects) && (
							<React.Fragment>
								<ObjectMini object={0} navigation={navigation} />
								<ObjectMini object={1} navigation={navigation} />
							</React.Fragment>
						)}
					</View>
				</View>
				{/* NEWS */}
				<View>
					<SubHeader title="Новости" />
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginLeft: 10,
							marginRight: 10,
							marginTop: 10,
							marginBottom: 10,
						}}
					>
						<News
							date="30.02.2036"
							title="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
						/>

						<View style={{ width: 1, backgroundColor: 'grey' }}></View>
						<News
							date="31.02.2036"
							title="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
						/>
					</View>
				</View>
			</ScrollView>
		</>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
const mapDispatchToProps = (dispatch) => {
	return {
		setUserInfo: (token) => dispatch({ type: 'SET_USER_INFO', payload: token }),
		setObjects: (payload) => dispatch({ type: 'SET_OBJECTS', payload }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
