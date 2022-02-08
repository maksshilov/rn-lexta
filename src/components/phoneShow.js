import React, { useState } from 'react'
import { Dimensions, View, Text, Pressable } from 'react-native'
import { colors, fonts } from '../styles/constants'
const { width: windowWidth } = Dimensions.get('window')

export default function PhoneShow({ phoneNumber, cart }) {
	const [phone, setPhone] = useState(false)
	return (
		<View
			style={{
				marginVertical: 10,
				alignItems: 'center',
			}}
		>
			<Pressable
				android_ripple={{ color: '#fff' }}
				style={[
					{
						backgroundColor: colors.red,
						height: windowWidth * 0.08,
						borderRadius: 5,
						alignItems: 'center',
						justifyContent: 'center',
					},
					cart
						? {
								width: windowWidth * 0.55,
						  }
						: {
								width: windowWidth * 0.94,
						  },
				]}
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
