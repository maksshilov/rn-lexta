import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ProfileDetailsItems({ icon, gender, content }) {
	return (
		<View style={styles.view}>
			{icon && (
				<MaterialCommunityIcons name={icon} color="#868686" size={40} style={styles.icon} />
			)}

			{gender && <Text style={styles.textBold}>Пол: </Text>}
			<Text style={styles.text}>{content}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		alignItems: 'center',
		width: windowWidth * 0.8,
		marginTop: 10,
		marginBottom: 10,
	},
	icon: {
		paddingRight: 20,
	},
	text: {
		fontFamily: 'gothampro-regular',
		fontSize: 25,
	},
	textBold: {
		fontFamily: 'gothampro-bold',
		fontSize: 25,
	},
})
