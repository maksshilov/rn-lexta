import { StyleSheet, Dimensions } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default StyleSheet.create({
	scrollView: {
		marginTop: windowHeight * 0.1,
		alignItems: 'center',
	},
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
