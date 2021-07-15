import React, { useState } from 'react'
import { Dimensions, View, Text, Pressable } from 'react-native'
const { width: windowWidth } = Dimensions.get('window')

export default function PhoneShow({ phoneNumber }) {
	const [phone, setPhone] = useState(false)
	return (
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
					width: windowWidth * 0.8,
					height: windowWidth * 0.1,
					borderRadius: 5,
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onPress={() => {
					setPhone(!phone)
				}}
			>
				<Text
					style={{
						color: '#fdfffc',
						fontFamily: 'gothampro-regular',
						fontSize: 13,
					}}
				>
					{phone ? phoneNumber : 'Показать телефон'}
				</Text>
			</Pressable>
		</View>
	)
}
