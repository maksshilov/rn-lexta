import { StyleSheet } from 'react-native'
import { colors, fonts, windowWidth, windowHeight } from './constants'
export default StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollView: {
		paddingTop: windowHeight * 0.1,
		alignItems: 'center',
	},
	header: {
		fontFamily: fonts.bold,
		fontSize: 20,
		marginBottom: 20,
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
		color: '#fff',
	},
	textBtm: {
		width: windowWidth * 0.8,
		textAlign: 'center',
		lineHeight: 15,
		marginTop: 20,
		fontFamily: fonts.regular,
		fontSize: 12,
		color: colors.grey,
		marginBottom: 20,
	},
})
