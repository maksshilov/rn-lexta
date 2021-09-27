import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MyObjects({ navigation }) {
	return (
		<View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
			<ScrollView>
				<View>
					<Text
						style={{
							fontFamily: 'gothampro-bold',
							fontSize: 15,
							marginVertical: 20,
							textAlign: 'center',
						}}
					>
						0 объявлений
					</Text>
				</View>
				<Pressable
					android_ripple
					onPress={() => {
						navigation.navigate('AddObject')
					}}
					style={{ ...styles.btn, ...styles.btnLogin }}
				>
					<Text style={{ ...styles.text, color: '#fff' }}>Добавить</Text>
				</Pressable>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		fontFamily: 'gothampro-bold',
		fontSize: 20,
		marginBottom: 20,
	},
	inputView: {
		paddingLeft: 15,
		justifyContent: 'center',
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#868686',
		marginBottom: 20,
	},
	inputText: {
		color: '#fdfffc',
		fontFamily: 'gothampro-regular',
		fontSize: 15,
		color: '#868686',
	},
	btn: {
		width: windowWidth * 0.8,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
	},
	btnLogin: {
		backgroundColor: '#912e33',
	},
	text: {
		fontFamily: 'gothampro-regular',
		fontSize: 18,
	},
})
