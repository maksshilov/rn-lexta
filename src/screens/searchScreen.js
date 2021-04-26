import React from 'react'
import { Button, Dimensions, Pressable, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { TokenConsumer } from '../components/tokenContext'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function SearchScreen() {
	const [data, setData] = React.useState(false)
	const [priceFrom, setPriceFrom] = React.useState(0)
	const [priceTo, setPriceTo] = React.useState(0)

	const handleSearch = async (token, priceFrom = '90000', priceTo = '100000') => {
		console.log(token, priceFrom, priceTo)
		if (token) {
			await fetch(
				`https://lexta.kproject.su/api/GetObjects.php?token=${token}&user=admin@lexta.kproject.su&priceFrom=${priceFrom}&priceTo=${priceTo}`
			)
				.then((res) => res.json())
				.then((json) => setData(json))
				.catch((err) => console.log(err))
		}
	}

	let datas = data ? (
		data.map((item) => {
			return (
				<View key={item.Message_ID} style={{ paddingVertical: 10 }}>
					<Text>City: {item.City}</Text>
					<Text>HouseType: {item.HouseType}</Text>
					<Text>BalconyType: {item.BalconyType}</Text>
					<Text>Floor: {item.Floor}</Text>
					<Text>Price: {item.Price}</Text>
				</View>
			)
		})
	) : (
		<Text>Press "Get objects"</Text>
	)

	const Main = () => {
		return (
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<View style={{ flexDirection: 'column' }}>{datas}</View>
			</View>
		)
	}

	return (
		<ScrollView contentContainerStyle={{ marginTop: 50, alignItems: 'center' }}>
			<TokenConsumer>
				{(token) => {
					return (
						<View>
							<Text>Search screen</Text>

							<View
								style={{
									paddingLeft: 10,
									justifyContent: 'center',
									width: windowWidth * 0.4,
									height: windowWidth * 0.1,
									borderRadius: 5,
									borderWidth: 1,
									borderColor: '#868686',
									marginBottom: 20,
								}}
							>
								<TextInput
									placeholder="Price from..."
									keyboardType="number-pad"
									onChangeText={setPriceFrom}
									style={{
										color: '#fdfffc',
										fontFamily: 'gothampro-regular',
										fontSize: 13,
										color: '#868686',
									}}
								/>
							</View>
							<View
								style={{
									paddingLeft: 10,
									justifyContent: 'center',
									width: windowWidth * 0.4,
									height: windowWidth * 0.1,
									borderRadius: 5,
									borderWidth: 1,
									borderColor: '#868686',
									marginBottom: 20,
								}}
							>
								<TextInput
									placeholder="Price to..."
									keyboardType="number-pad"
									onChangeText={setPriceTo}
									style={{
										color: '#fdfffc',
										fontFamily: 'gothampro-regular',
										fontSize: 13,
										color: '#868686',
									}}
								/>
							</View>

							<View
								style={{
									marginBottom: 20,
									alignItems: 'center',
								}}
							>
								<Pressable
									android_ripple={{ color: '#fff' }}
									style={{
										backgroundColor: '#912e33',
										width: windowWidth * 0.3,
										height: windowWidth * 0.1,
										borderRadius: 5,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									onPress={() => {
										handleSearch(token, priceFrom, priceTo)
									}}
								>
									<Text
										style={{
											color: '#fdfffc',
											fontFamily: 'gothampro-regular',
											fontSize: 13,
										}}
									>
										Найти
									</Text>
								</Pressable>
							</View>
						</View>
					)
				}}
			</TokenConsumer>
			<Main />
		</ScrollView>
	)
}
