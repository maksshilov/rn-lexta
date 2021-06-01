import React, { useState } from 'react'
import { View, Dimensions, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import Icon from 'react-native-vector-icons/FontAwesome'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function RegField({ label, value = true, setValue, pass, gender = false, phone, birthDate }) {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

	const showDatePicker = () => {
		setDatePickerVisibility(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
	}

	const handleConfirm = (date) => {
		date = new Date(date).toISOString().substring(0, 10).replace(/-/gi, '.')
		setValue(date)
		hideDatePicker()
	}

	const passProps = pass ? { secureTextEntry: true, textContentType: 'password' } : false
	const phoneProps = phone ? { keyboardType: 'phone-pad' } : false
	return !gender ? (
		<React.Fragment>
			<View style={styles.inputView}>
				<TextInput
					placeholder={label}
					style={styles.inputText}
					value={value}
					onChangeText={(e) => setValue(e)}
					{...passProps}
					{...phoneProps}
				/>
				{value && !birthDate ? <Icon name="times-circle" color={'#912e33'} size={20} onPress={() => setValue('')} /> : false}
				{birthDate ? (
					<TouchableOpacity activeOpacity={0.5} onPress={showDatePicker}>
						<Icon name="calendar" color={'#868686'} size={20} />
					</TouchableOpacity>
				) : (
					false
				)}
			</View>
			<DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
		</React.Fragment>
	) : (
		<View style={styles.inputGender}>
			<Text style={styles.inputText}>Пол:</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<RadioButton color="#912e33" status={value === 1 ? 'checked' : 'uncheked'} onPress={() => setValue(1)} />
				<Text style={{ ...styles.textGender, marginRight: 20 }}>Мужской</Text>
				<RadioButton color="#912e33" status={value === 0 ? 'checked' : 'uncheked'} onPress={() => setValue(0)} />
				<Text style={styles.textGender}>Женский</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
		borderColor: '#868686',
		marginBottom: 20,
	},
	error: {
		backgroundColor: 'rgba(255,0,0,0.3)',
	},
	inputText: {
		width: windowWidth * 0.65,
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
	inputGender: {
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		paddingLeft: 15,
		marginBottom: 20,
	},
	textGender: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
		color: '#868686',
	},
})
