import React from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
const { width: windowWidth } = Dimensions.get('window')

export default function News({ date, title }) {
	return (
		<View style={{ width: windowWidth * 0.45 }}>
			<Text style={{ ...styles.text, color: '#8f2d32' }}>{date}</Text>
			<Text style={{ ...styles.text, lineHeight: 15 }}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'gothampro-regular',
		fontSize: 12,
		marginBottom: 10,
	},
})
