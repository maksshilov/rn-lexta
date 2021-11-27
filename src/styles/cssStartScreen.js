import { StyleSheet } from 'react-native'
import { colors, fonts, windowWidth, windowHeight } from './constants'
export default StyleSheet.create({
	btn: {
		width: 270,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
	},
	btnLogin: {
		backgroundColor: colors.red,
	},
	btnReg: {
		borderWidth: 2,
		borderColor: colors.red,
	},
	text: {
		fontFamily: fonts.regular,
		fontSize: 18,
		color: '#fff',
	},
})
