import React from 'react'
import { View, Text } from 'react-native'

export default function ObjectParams({ type, value }) {
	return (
		<View style={{ width: '25%', alignItems: 'center' }}>
			<Text
				style={{
					fontFamily: 'gothampro-regular',
					fontSize: 16,
					marginBottom: 5,
				}}
			>
				{value}
			</Text>
			<Text
				style={{
					fontFamily: 'gothampro-regular',
					fontSize: 13,
					color: '#7e7e7e',
				}}
			>
				{type}
			</Text>
		</View>
	)
}
