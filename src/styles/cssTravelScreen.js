import { StyleSheet } from 'react-native'
import { colors, fonts, windowWidth, windowHeight } from './constants'

export default StyleSheet.create({
	cityInputWrapper: {
		paddingLeft: 10,
		paddingRight: 10,
		width: windowWidth * 0.94,
		height: windowWidth * 0.1,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: colors.grey,
		justifyContent: 'center',
	},
	cityInputText: {
		fontFamily: fonts.regular,
		fontSize: 15,
	},
	btnsWrapper: {
		width: windowWidth * 0.94,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.grey,
		width: windowWidth * 0.46,
		height: windowWidth * 0.1,
		borderRadius: 10,
	},
	btnTitle: {
		fontFamily: fonts.regular,
		fontSize: 15,
		color: '#000',
	},
	btnSearch: {
		marginTop: 10,
		width: windowWidth * 0.94,
		height: windowWidth * 0.15,
		borderRadius: 10,
		backgroundColor: colors.red,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnSearchTitle: {
		fontFamily: fonts.bold,
		fontSize: 15,
		color: '#fff',
	},
})
