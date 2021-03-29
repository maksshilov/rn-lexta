import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, Dimensions, View, Text, StyleSheet } from 'react-native'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function AppDetails({ label, value }) {
	return (
		<View style={{ flexDirection: 'row' }}>
			<Text style={{ ...styles.appDetails, color: '#7e7e7e' }}>{label}</Text>
			<Text style={styles.appDetails}>{value}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	appDetails: {
		width: windowWidth / 2,
		fontFamily: 'gothampro-regular',
		lineHeight: 15,
		fontSize: 13,
		marginTop: 15,
	},
})
