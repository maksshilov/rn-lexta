import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, Dimensions, View, Text, TouchableOpacity } from 'react-native'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function PhoneShow() {
	const [phone, setPhone] = useState(false)
	console.log(phone)
	return (
		<TouchableOpacity
			style={{ alignItems: 'center' }}
			onPress={() => {
				setPhone(!phone)
			}}
		>
			<View
				style={{
					backgroundColor: '#912e33',
					alignItems: 'center',
					justifyContent: 'center',
					width: windowWidth * 0.9,
					height: windowWidth * 0.1,
					borderRadius: 5,
					marginBottom: 20,
				}}
			>
				<Text
					style={{
						color: '#fdfffc',
						fontFamily: 'gothampro-regular',
						fontSize: 13,
					}}
				>
					{phone ? '+223 (322) 223-322' : 'Показать телефон'}
				</Text>
			</View>
		</TouchableOpacity>
	)
}
