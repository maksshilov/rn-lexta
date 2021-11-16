import { StyleSheet, Dimensions } from 'react-native'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default StyleSheet.create({
	wrapperFrowMb20: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	title: {
		fontFamily: 'gothampro-regular',
		fontSize: 18,
		color: '#000',
		marginBottom: 10,
	},
	scrollViewCcs: {
		paddingBottom: 25,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	scrollView: {
		width: windowWidth,
	},
	viewCity: {
		paddingLeft: 10,
		paddingRight: 10,
		width: windowWidth * 0.94,
		height: windowWidth * 0.1,
		borderWidth: 1,
		borderBottomWidth: 0,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderColor: '#868686',
		justifyContent: 'center',
	},
	inputCity: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
	},
	viewPickerBase: {
		flexDirection: 'row',
		width: windowWidth * 0.94,
		height: windowWidth * 0.1,
		borderWidth: 1,
		borderColor: '#868686',
	},
	viewPickerCategory: {
		borderTopWidth: 0,
	},
	viewPickerRooms: {
		borderTopWidth: 0,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	picker: {
		width: windowWidth * 0.94,
		height: windowWidth * 0.1,
	},
	selectBase: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#868686',
	},
	selectObjectTypelLeft: {
		width: windowWidth * 0.18,
		height: windowWidth * 0.1,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	selectObjectTypelCenter: {
		width: windowWidth * 0.44,
		height: windowWidth * 0.1,
		borderLeftWidth: 0,
	},
	selectObjectTypelRight: {
		width: windowWidth * 0.32,
		height: windowWidth * 0.1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderLeftWidth: 0,
	},
	selected: {
		backgroundColor: '#acacac',
	},
	selectText: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
		color: '#000',
	},
	inputPriceAreaLeft: {
		paddingLeft: 10,
		paddingRight: 10,
		width: windowWidth * 0.41,
		height: windowWidth * 0.1,
		borderWidth: 1,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderColor: '#868686',
		justifyContent: 'center',
		fontFamily: 'gothampro-regular',
		fontSize: 15,
	},
	inputPriceAreaRight: {
		paddingLeft: 10,
		paddingRight: 10,
		width: windowWidth * 0.41,
		height: windowWidth * 0.1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#868686',
		justifyContent: 'center',
		fontFamily: 'gothampro-regular',
		fontSize: 15,
	},
	unitsView: {
		justifyContent: 'center',
		alignItems: 'center',
		width: windowWidth * 0.12,
		height: windowWidth * 0.1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderColor: '#868686',
	},
	unitsText: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
	},
	inputFloorBase: {
		paddingLeft: 10,
		paddingRight: 10,
		width: windowWidth * 0.47,
		height: windowWidth * 0.1,
		borderWidth: 1,
		borderColor: '#868686',
		justifyContent: 'center',
		fontFamily: 'gothampro-regular',
		fontSize: 15,
	},
	inputFloorLeft: {
		borderTopLeftRadius: 10,
	},
	inputFloorRight: {
		borderTopRightRadius: 10,
		borderLeftWidth: 0,
	},
	selectFloorLeft: {
		width: windowWidth * 0.3,
		height: windowWidth * 0.1,
		borderBottomLeftRadius: 10,
		borderTopWidth: 0,
	},
	selectFloorCenter: {
		width: windowWidth * 0.34,
		height: windowWidth * 0.1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
	selectFloorRight: {
		width: windowWidth * 0.3,
		height: windowWidth * 0.1,
		borderBottomRightRadius: 10,
		borderTopWidth: 0,
	},
	viewPickerHouseType: {
		borderRadius: 10,
		marginBottom: 20,
	},
	checkBox: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	checkBoxText: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
	},
	// OLD

	selectedText: {
		color: '#fff',
	},
	textInput: {
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		borderWidth: 1,
		borderColor: '#868686',
	},
})
