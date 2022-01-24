import React from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { fonts } from '../styles/constants'
const { width: windowWidth } = Dimensions.get('window')

export default function News({ date, title }) {
	return (
		<View style={{ width: windowWidth * 0.94 }}>
			<Text style={{ ...styles.text, color: '#8f2d32', marginBottom: 6 }}>{date}</Text>
			<Text style={{ ...styles.text, lineHeight: 20 }}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	text: {
		fontFamily: fonts.regular,
		fontSize: 15,
	},
})
