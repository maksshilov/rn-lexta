import { StyleSheet } from 'react-native'
import { colors, fonts, windowWidth, windowHeight } from './constants'

export default StyleSheet.create({
	mainViewWrapper: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollView: {
		width: windowWidth,
	},
	scrollViewCCS: {
		paddingTop: 10,
		paddingBottom: 25,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	title: {
		fontFamily: fonts.regular,
		fontSize: 18,
		color: '#000',
		marginBottom: 10,
	},
	select: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.grey,
		marginBottom: 20,
	},
	selected: {
		backgroundColor: '#acacac',
	},
	selectText: {
		fontFamily: fonts.regular,
		fontSize: 15,
		color: '#000',
	},
	selectedText: {
		color: '#fff',
	},
	checkBox: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	checkBoxText: {
		fontFamily: fonts.regular,
		fontSize: 15,
	},
	textInput: {
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		borderWidth: 1,
		borderColor: colors.grey,
	},
	textInputInput: {
		fontSize: 15,
		fontFamily: fonts.regular,
		fontWeight: 'normal',
	},
	units: {
		justifyContent: 'center',
		alignItems: 'center',
		width: windowWidth * 0.12,
		height: windowWidth * 0.1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderColor: colors.grey,
		marginBottom: 20,
	},
})
