import React, { Fragment } from 'react'
import { Button, Dimensions, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import LextaService from '../services/LextaService'
import store from '../store'
import md5 from 'md5'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const MessageScreen = ({ state }) => {
	const handleGetMessages = async () => {
		const lexta = new LextaService()
		lexta
			.getMessages(
				store.getState().reducerUser.Token,
				md5(store.getState().reducerUser.Email),
				0
			)
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err))
	}

	return (
		<Fragment>
			<ScrollView
				contentContainerStyle={{
					backgroundColor: '#fff',
					paddingVertical: 20,
					alignItems: 'center',
					marginTop: 30,
				}}
			>
				<View
					style={{
						width: windowWidth * 0.9,
					}}
				>
					<View
						style={{
							backgroundColor: '#912e33',
							padding: 5,
							borderWidth: 1,
							borderBottomWidth: 0,
							borderRadius: 10,
							borderBottomLeftRadius: 0,
							borderBottomRightRadius: 0,
						}}
					>
						<Text
							style={{
								fontFamily: 'gothampro-bold',
								color: '#fff',
								fontSize: 12,
								lineHeight: 15,
							}}
						>
							Коммерческая недвижимостьб 150 м2{'\n'}
							Полиграф Шариков (id:13)
						</Text>
					</View>
					<View
						style={{
							borderWidth: 1,
							borderTopWidth: 0,
							borderRadius: 10,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
							backgroundColor: '#eee',
							padding: 5,
						}}
					>
						<Text
							style={{
								fontFamily: 'gothampro-regular',
								color: '#000',
								fontSize: 12,
								lineHeight: 15,
							}}
						>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. A eum eius
							maxime nobis beatae nulla labore debitis eligendi quam voluptatum in
							laboriosam enim, odio inventore, blanditiis unde nemo autem accusantium.
						</Text>
					</View>
					<View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
						<Text
							style={{
								fontFamily: 'gothampro-regular',
								color: '#999',
								fontSize: 10,
								lineHeight: 15,
							}}
						>
							2019.12.32 | 25:99
						</Text>
					</View>
				</View>
			</ScrollView>
		</Fragment>
		// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		// 	<Text>Message screen</Text>
		// 	<Button onPress={handleGetMessages} title="Check" />
		// </View>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
export default connect(mapStateToProps)(MessageScreen)
