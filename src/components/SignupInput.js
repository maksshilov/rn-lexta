import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import css from '../styles/cssSignupField'
import { colors } from '../styles/constants'

export default function SignupInput({ label, value, setValue, pass, gender = false, phone, birthDate }) {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

	const handleConfirm = (date) => {
		date = new Date(date).toISOString().substring(0, 10).replace(/-/gi, '.')
		setValue(date)
		setDatePickerVisibility(false)
	}

	const passProps = pass ? { secureTextEntry: true, textContentType: 'password' } : false
	const phoneProps = phone ? { keyboardType: 'phone-pad' } : false
	return !gender ? (
		<React.Fragment>
			<View style={css.inputView}>
				<TextInput placeholder={label} style={css.inputText} value={value} onChangeText={(e) => setValue(e)} {...passProps} {...phoneProps} />
				{value && !birthDate ? <Icon name="times-circle" color={colors.red} size={20} onPress={() => setValue('')} /> : false}
				{birthDate ? (
					<TouchableOpacity activeOpacity={0.5} onPress={() => setDatePickerVisibility(true)}>
						<Icon name="calendar" color={colors.grey} size={20} />
					</TouchableOpacity>
				) : (
					false
				)}
			</View>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={() => setDatePickerVisibility(false)}
			/>
		</React.Fragment>
	) : (
		<View style={css.inputGender}>
			<Text style={css.inputText}>Пол:</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<RadioButton color={colors.red} status={value === 1 ? 'checked' : 'uncheked'} onPress={() => setValue(1)} />
				<Text style={css.textGender}>Мужской</Text>
				<RadioButton color={colors.red} status={value === 0 ? 'checked' : 'uncheked'} onPress={() => setValue(0)} />
				<Text style={css.textGender}>Женский</Text>
			</View>
		</View>
	)
}
