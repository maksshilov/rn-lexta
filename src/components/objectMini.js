import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function ObjectMini({
	windowWidth,
	price,
	rooms,
	square,
	floor,
	address,
	navigation,
}) {
	return (
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
				{price} &#8381;
			</Text>
			<Text
				style={{
					fontFamily: 'gothampro-regular',
					fontSize: 12,
					marginBottom: 10,
				}}
			>
				{rooms} | {square} | {floor}
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
				{address}
			</Text>
		</View>
	)
}
