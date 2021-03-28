import React from 'react'
import { Text, View } from 'react-native'

export default function ProfileMenuSection({ title, icon }) {
	return (
		<View
			style={{
				width: '100%',
				marginTop: 40,
				marginBottom: 0,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Text style={{ fontFamily: 'gothampro-regular', fontSize: 13, color: '#808080' }}>
				{title}
			</Text>
		</View>
	)
}
