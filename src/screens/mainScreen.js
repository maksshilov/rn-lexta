import React from 'react'
import { Image, Text, View, Dimensions, Animated } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Carousel from '../components/carousel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Animated from 'react-native-reanimated'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MainScreen({ navigation }) {
	const scrollY = React.useRef(new Animated.Value(0)).current
	const touchScaleK = React.useRef(new Animated.Value(1)).current

	const handlePressIn = () => {
		Animated.spring(touchScaleK, {
			toValue: 0.75,
			useNativeDriver: false,
		}).start()
	}
	const handlePressOut = () => {
		Animated.spring(touchScaleK, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: false,
		}).start()
		navigation.navigate('Profile')
	}

	return (
		<>
			{/* HEADER */}
			<Animated.View
				style={{
					flexDirection: 'row',
					paddingTop: windowHeight * 0.05,
					paddingBottom: windowHeight * 0.01,
					alignItems: 'center',
					backgroundColor: '#fff',
					elevation: scrollY.interpolate({
						inputRange: [0, 10],
						outputRange: [0, 10],
						extrapolate: 'clamp',
					}),
				}}
			>
				<View
					style={{
						width: windowWidth * 0.3,
					}}
				></View>
				<Image
					source={require('../../assets/logo_login.png')}
					style={{
						height: windowHeight * 0.05,
						width: windowWidth * 0.4,
					}}
					resizeMode="contain"
				/>
				<View
					style={{
						width: windowWidth * 0.3,
						alignItems: 'flex-end',
						paddingRight: 20,
					}}
				>
					<Animated.View style={{ transform: [{ scale: touchScaleK }] }}>
						<TouchableOpacity
							onPressIn={handlePressIn}
							onPressOut={handlePressOut}
							activeOpacity={0.7}
						>
							<MaterialCommunityIcons name="account-circle" size={40} color="grey" />
						</TouchableOpacity>
					</Animated.View>
				</View>
			</Animated.View>
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
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ width: '80%' }}>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 15,
									marginLeft: 10,
									marginBottom: 10,
									marginTop: windowHeight * 0.02,
								}}
							>
								Жильё на любой вкус
							</Text>
						</View>
						<View style={{ width: '20%', alignItems: 'flex-end', paddingRight: 10 }}>
							<MaterialCommunityIcons name="arrow-right" color="grey" size={20} />
						</View>
					</View>
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
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ width: '80%' }}>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 15,
									marginLeft: 10,
									marginBottom: 10,
								}}
							>
								Популярное в Вашем городе
							</Text>
						</View>
						<View style={{ width: '20%', alignItems: 'flex-end', paddingRight: 10 }}>
							<MaterialCommunityIcons name="arrow-right" color="grey" size={20} />
						</View>
					</View>

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
						<View
							style={{
								width: windowWidth * 0.45,
							}}
						>
							<Image
								source={{
									uri: `https://picsum.photos/1440/2842?random=${Math.round(
										Math.random() * 1000
									)}`,
								}}
								resizeMode="cover"
								style={{
									width: windowWidth * 0.45,
									height: windowWidth * 0.45,
									marginBottom: 10,
								}}
							/>

							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 12,
									marginBottom: 10,
								}}
							>
								6 000 000 &#8381;
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
								}}
							>
								2-комн. | 75.5 м2 | 6 эт.
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
									color: 'grey',
									lineHeight: 15,
								}}
							>
								г. Обнинск, пр-т Маркса, 120
							</Text>
						</View>
						<View
							style={{
								width: windowWidth * 0.45,
							}}
						>
							<Image
								source={{
									uri: `https://picsum.photos/1440/2842?random=${Math.round(
										Math.random() * 1000
									)}`,
								}}
								resizeMode="cover"
								style={{
									width: windowWidth * 0.45,
									height: windowWidth * 0.45,
									marginBottom: 10,
								}}
							/>

							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 12,
									marginBottom: 10,
								}}
							>
								6 000 000 &#8381;
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
								}}
							>
								2-комн. | 75.5 м2 | 6 эт.
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
									color: 'grey',
									lineHeight: 15,
								}}
							>
								г. Обнинск, пр-т Маркса, 120
							</Text>
						</View>
					</View>
				</View>
				{/* NEWS */}
				<View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ width: '80%' }}>
							<Text
								style={{
									fontFamily: 'gothampro-bold',
									fontSize: 15,
									marginLeft: 10,
									marginBottom: 10,
								}}
							>
								Новости
							</Text>
						</View>
						<View style={{ width: '20%', alignItems: 'flex-end', paddingRight: 10 }}>
							<MaterialCommunityIcons name="arrow-right" color="grey" size={20} />
						</View>
					</View>

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
						<View style={{ width: windowWidth * 0.45 }}>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
									color: '#8f2d32',
								}}
							>
								30.02.2036
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
									lineHeight: 15,
								}}
							>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							</Text>
						</View>
						<View
							style={{ width: windowWidth * 0.005, backgroundColor: 'grey' }}
						></View>
						<View style={{ width: windowWidth * 0.45 }}>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
									color: '#8f2d32',
								}}
							>
								30.02.2036
							</Text>
							<Text
								style={{
									fontFamily: 'gothampro-regular',
									fontSize: 12,
									marginBottom: 10,
									lineHeight: 15,
								}}
							>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</>
	)
}
