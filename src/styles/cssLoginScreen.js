import { StyleSheet } from 'react-native'
import { colors, fonts, windowWidth, windowHeight } from './constants'

export default StyleSheet.create({
	scrollView: {
		marginTop: windowHeight * 0.1,
		alignItems: 'center',
	},
	header: {
		fontFamily: fonts.bold,
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
		borderColor: colors.grey,
		marginBottom: 20,
	},
	inputText: {
		color: '#fdfffc',
		fontFamily: fonts.regular,
		fontSize: 15,
		color: colors.grey,
	},
	btn: {
		width: windowWidth * 0.8,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
	},
	btnLogin: {
		backgroundColor: colors.red,
	},
	text: {
		fontFamily: fonts.regular,
		fontSize: 18,
	},
})
