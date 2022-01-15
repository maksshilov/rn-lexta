import React, { useState } from 'react'
import { Dimensions, View, Text, Pressable } from 'react-native'
import { colors, fonts } from '../styles/constants'
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
					backgroundColor: colors.red,
					width: windowWidth * 0.94,
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
						fontFamily: fonts.regular,
						fontSize: 13,
					}}
				>
					{phone ? phoneNumber : 'Показать телефон'}
				</Text>
			</Pressable>
		</View>
	)
}
