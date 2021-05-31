import React from 'react'
import { Dimensions, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const ObjectMini = (props) => {
	const { object, navigation, state } = props

	console.log('OBJECTMINI', props)
	const { Price, NumberRooms, TotalArea, Floor, Street } = state.reducerObjects[object]
	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('Object', {
					object,
				})
			}
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
					{Price.toString()
						.split('')
						.reverse()
						.join('')
						.replace(/([0-9]{3})/g, '$1 ')
						.split('')
						.reverse()
						.join('')}{' '}
					&#8381;
				</Text>
				<Text
					style={{
						fontFamily: 'gothampro-regular',
						fontSize: 12,
						marginBottom: 10,
					}}
				>
					{`${NumberRooms}-комн.`} | {`${TotalArea} м2`} | {`${Floor} эт.`}
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
					{Street}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

const mapStateToProps = (state) => {
	return { state }
}

export default connect(mapStateToProps)(ObjectMini)
