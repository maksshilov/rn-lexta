import React from 'react'
import { Image, ImageBackground, Text, View, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Carousel from '../components/carousel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MainScreen() {
	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			{/* HEADER */}
			<View
				style={{
					flexDirection: 'row',
					marginTop: windowHeight * 0.05,
					marginBottom: 15,
					alignItems: 'center',
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
					<MaterialCommunityIcons name="account-circle" size={40} color="grey" />
				</View>
			</View>
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
					<View>
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
							style={{ fontFamily: 'gothampro-bold', fontSize: 12, marginBottom: 10 }}
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
							}}
						>
							г. Обнинск, пр-т Маркса, 120
						</Text>
					</View>
					<View>
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
							style={{ fontFamily: 'gothampro-bold', fontSize: 12, marginBottom: 10 }}
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
					<View style={{ width: windowWidth * 0.005, backgroundColor: 'grey' }}></View>
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
	)
}
