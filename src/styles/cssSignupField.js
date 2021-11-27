import { StyleSheet } from 'react-native'
import { colors, fonts, windowWidth, windowHeight } from './constants'
export default StyleSheet.create({
	inputView: {
		paddingLeft: 15,
		paddingRight: 20,
		justifyContent: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.grey,
		marginBottom: 20,
	},
	error: {
		backgroundColor: 'rgba(255,0,0,0.3)',
	},
	inputText: {
		width: windowWidth * 0.65,
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
	inputGender: {
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		paddingLeft: 15,
		marginBottom: 20,
	},
	textGender: {
		fontFamily: fonts.regular,
		fontSize: 15,
		color: colors.grey,
		marginRight: 20,
	},
})
