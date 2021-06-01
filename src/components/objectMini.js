import React from 'react'
import { Dimensions, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { numSplit } from '../components/scripts'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ObjectMini({ object, navigation, toTop }) {
	const { Price, NumberRooms, TotalArea, Floor, Street } = object
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Object', {
					object,
				})
				toTop({ x: 0, y: 0, animated: true })
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
					{numSplit(Price)} &#8381;
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
