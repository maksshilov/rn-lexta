import { StyleSheet } from 'react-native'
import { colors, fonts, windowWidth, windowHeight } from './constants'

export default StyleSheet.create({
	mainViewWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	scrollView: {
		width: windowWidth,
	},
	scrollViewCCS: {
		flexGrow: 1,
		paddingTop: 10,
		paddingBottom: 25,
		backgroundColor: '#fff',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	viewSelectorWrapper: {
		width: windowWidth * 0.94,
		marginBottom: 20,
	},
	viewSelector: {
		justifyContent: 'center',
		height: windowWidth * 0.1,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#868686',
	},
	viewSelectorUnchecked: {
		backgroundColor: '#fff',
	},
	viewSelectorChecked: {
		backgroundColor: '#acacac',
	},
	viewRow: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	objectTypeLeft: {
		width: windowWidth * 0.47,
		height: windowWidth * 0.1,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	objectTypeRight: {
		width: windowWidth * 0.47,
		height: windowWidth * 0.1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderStartWidth: 0,
	},
	regionStreetInput: {
		width: windowWidth * 0.47,
		height: windowWidth * 0.1,
		borderRadius: 10,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	cityHouseNumberinput: {
		width: windowWidth * 0.47,
		height: windowWidth * 0.1,
		borderRadius: 10,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderLeftWidth: 0,
	},
	viewLocation: {
		width: windowWidth * 0.94,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	locationInput: {
		width: windowWidth * 0.8,
		height: windowWidth * 0.1,
		borderRadius: 10,
	},
	locationBtn: {
		backgroundColor: colors.red,
		width: windowWidth * 0.1,
		height: windowWidth * 0.1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	locationTxt: {
		color: '#fdfffc',
		fontFamily: 'gothampro-regular',
		fontSize: 18,
	},
	fullRowInput: {
		width: windowWidth * 0.94,
		height: windowWidth * 0.1,
		borderRadius: 10,
	},
	totalAreaInput_1: {
		width: windowWidth * 0.47,
		height: windowWidth * 0.1,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	livingAreaInput_1: {
		width: windowWidth * 0.47,
		height: windowWidth * 0.1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderLeftWidth: 0,
	},
	totalAreaInput_2: {
		width: windowWidth * 0.31,
		height: windowWidth * 0.1,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	kitchenAreaInput: {
		width: windowWidth * 0.32,
		height: windowWidth * 0.1,
		borderWidth: 0,
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	livingAreaInput_2: {
		width: windowWidth * 0.31,
		height: windowWidth * 0.1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	viewWrapper_3_6_Btns: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	press_3_6_w25: {
		width: windowWidth * 0.25,
		height: windowWidth * 0.15,
		borderWidth: 1,
		borderRadius: 10,
	},
	press_3_6_w35: {
		width: windowWidth * 0.35,
		height: windowWidth * 0.15,
		borderWidth: 1,
		borderRadius: 10,
	},
	text_3_6: {
		textAlign: 'center',
		lineHeight: 20,
	},
	priceInput: {
		width: windowWidth * 0.82,
		height: windowWidth * 0.1,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderRightWidth: 0,
	},
	descrInput: {
		paddingVertical: 5,
		textAlignVertical: 'top',
		width: windowWidth * 0.94,
		height: windowWidth * 0.3,
		borderWidth: 1,
		borderRadius: 10,
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
	addViewWrapper: {
		alignItems: 'center',
	},
	addPress: {
		backgroundColor: colors.red,
		width: windowWidth * 0.94,
		height: windowWidth * 0.1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addText: {
		color: '#fdfffc',
		fontFamily: fonts.regular,
		fontSize: 18,
	},
})
