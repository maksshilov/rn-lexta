import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { numSplit } from './scripts'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ObjectMini({ object, navigation, toTop = null }) {
	const { Price, NumberRooms, TotalArea, Floor, Street, Img } = object

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Object', {
					object,
				})
				toTop && toTop({ x: 0, y: 0, animated: true })
			}}
		>
			<View style={{ width: windowWidth * 0.45 }}>
				<Image
					source={{
						uri: `https://lexta.pro${Img[0]}`,
					}}
					resizeMode="cover"
					style={styles.imageView}
				/>

				<Text style={styles.price}>{numSplit(Price)} &#8381;</Text>
				<Text style={styles.details}>
					{`${NumberRooms}`}
					{'\n'}
					{`${TotalArea} м2`}
					{'\n'}
					{`${Floor} этаж`}
				</Text>
				<Text style={styles.address}>{Street}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	imageView: {
		width: windowWidth * 0.45,
		height: windowWidth * 0.45,
		marginBottom: 10,
	},
	price: {
		fontFamily: 'gothampro-bold',
		fontSize: 12,
		marginBottom: 5,
	},
	details: {
		lineHeight: 15,
		fontFamily: 'gothampro-regular',
		fontSize: 12,
		marginBottom: 5,
	},
	address: {
		fontFamily: 'gothampro-regular',
		fontSize: 12,
		marginBottom: 10,
		color: 'grey',
	},
})
