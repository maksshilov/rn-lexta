import React, { Fragment, useState } from 'react'
import { TouchableOpacity, Button, Dimensions, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import LextaService from '../services/LextaService'
import store from '../store'
import md5 from 'md5'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const MessageScreen = ({ state }) => {
	const [messagesType, setMessagesType] = useState(0)

	const handleGetMessages = async (type) => {
		const lexta = new LextaService()
		lexta
			.getMessages(
				store.getState().reducerUser.Token,
				md5(store.getState().reducerUser.Email),
				type
			)
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err))
	}

	return (
		<Fragment>
			<View style={{ backgroundColor: '#fff', paddingTop: 50 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<TouchableOpacity
						onPress={() => {
							handleGetMessages(0)
							setMessagesType(0)
						}}
					>
						<View
							style={[
								{
									borderWidth: 1,
									borderRightWidth: 0,
									borderRadius: 10,
									borderTopEndRadius: 0,
									borderBottomEndRadius: 0,
									paddingHorizontal: 10,
									paddingVertical: 5,
									width: windowWidth * 0.4,
									alignItems: 'center',
									backgroundColor: '#fff',
								},
								messagesType === 0
									? {
											backgroundColor: '#912e33',
									  }
									: null,
							]}
						>
							<Text
								style={[
									{
										fontFamily: 'gothampro-regular',
										fontSize: 15,
										color: '#000',
									},
									messagesType === 0
										? {
												color: '#fff',
										  }
										: null,
								]}
							>
								Входящие
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							handleGetMessages(1)
							setMessagesType(1)
						}}
					>
						<View
							style={[
								{
									borderWidth: 1,
									borderRadius: 10,
									borderTopStartRadius: 0,
									borderBottomStartRadius: 0,
									paddingHorizontal: 10,
									paddingVertical: 5,
									width: windowWidth * 0.4,
									alignItems: 'center',
								},
								messagesType === 1
									? {
											backgroundColor: '#912e33',
									  }
									: null,
							]}
						>
							<Text
								style={[
									{
										fontFamily: 'gothampro-regular',
										fontSize: 15,
										color: '#000',
									},
									messagesType === 1
										? {
												color: '#fff',
										  }
										: null,
								]}
							>
								Исходящие
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<ScrollView
					contentContainerStyle={{
						backgroundColor: '#fff',
						paddingVertical: 20,
						alignItems: 'center',
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
								Обнинск{'\n'}
								Белкинская, д.1
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
								laboriosam enim, odio inventore, blanditiis unde nemo autem
								accusantium.
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
			</View>
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
