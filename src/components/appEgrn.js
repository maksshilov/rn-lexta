import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, Dimensions, View, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function AppEgrn({ status, value }) {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
			<MaterialCommunityIcons name="check" color="green" />
			<Text style={styles.appDetails}>{value}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	appDetails: {
		fontFamily: 'gothampro-regular',
		fontSize: 10,
		marginLeft: 10,
	},
})
