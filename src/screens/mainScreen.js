import React from 'react'
import { Image, Text, View, Dimensions, Animated, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Carousel from '../components/carousel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ObjectMini from '../components/objectMini'
import Header from '../components/header'
import SubHeader from '../components/subHeader'
import News from '../components/news'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MainScreen({ navigation }) {
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
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('Object', {
									price: '6 000 000',
									rooms: '6-комн.',
									square: '66.6 м2',
									floor: '6 эт.',
									address: 'г. Обнинск, пр-т Маркса, 666',
								})
							}
						>
							<ObjectMini
								windowWidth={windowWidth}
								price="6 000 000"
								rooms="6-комн."
								square="66.6 м2"
								floor="6 эт."
								address="г. Обнинск, пр-т Маркса, 666"
								navigation={navigation}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() =>
								navigation.navigate('Object', {
									price: '2 000 000',
									rooms: '2-комн.',
									square: '22.2 м2',
									floor: '2 эт.',
									address: 'г. Обнинск, пр-т Маркса, 222',
								})
							}
						>
							<ObjectMini
								windowWidth={windowWidth}
								price="2 000 000"
								rooms="2-комн."
								square="22.2 м2"
								floor="2 эт."
								address="г. Обнинск, пр-т Маркса, 222"
								navigation={navigation}
							/>
						</TouchableOpacity>
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
