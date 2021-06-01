import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { numSplit } from '../components/scripts'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ObjectMini({ object, navigation, toTop = false }) {
	const { Price, NumberRooms, TotalArea, Floor, Street } = object
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
						uri: `https://picsum.photos/1440/2842?random=${Math.round(
							Math.random() * 1000
						)}`,
					}}
					resizeMode="cover"
					style={styles.imageView}
				/>

				<Text style={styles.price}>{numSplit(Price)} &#8381;</Text>
				<Text style={styles.details}>
					{`${NumberRooms}-комн.`} | {`${TotalArea} м2`} | {`${Floor} эт.`}
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
		marginBottom: 10,
	},
	details: {
		fontFamily: 'gothampro-regular',
		fontSize: 12,
		marginBottom: 10,
	},
	address: {
		fontFamily: 'gothampro-regular',
		fontSize: 12,
		marginBottom: 10,
		color: 'grey',
		lineHeight: 15,
	},
})
