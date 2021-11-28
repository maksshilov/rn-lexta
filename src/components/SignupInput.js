import React, { useEffect, useReducer, useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import css from '../styles/cssSignupField'
import { colors } from '../styles/constants'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'
const INPUT_CLEAR = 'INPUT_CLEAR'
const INPUT_DATE = 'INPUT_DATE'
const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return { ...state, value: action.value, isValid: action.isValid }
		case INPUT_BLUR:
			return { ...state, touched: true }
		case INPUT_CLEAR:
			return { ...state, value: '', isValid: false }
		case INPUT_DATE:
			return { value: action.value }
		default:
			return state
	}
}

export default function SignupInput(props) {
	const { id, label, onInputChange } = props

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [inputState, dispatchInputState] = useReducer(inputReducer, {
		value: id === 'gender' ? 'unchecked' : '',
		isValid: false,
		touched: false,
	})

	useEffect(() => {
		if (inputState.touched || id === 'gender' || id === 'birthDate') {
			onInputChange(id, inputState.value, inputState.isValid)
		}
	}, [inputState, onInputChange])

	const textChangeHandler = (text) => {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		let isValid = true

		if (props.required && text.trim().length === 0) {
			isValid = false
		}

		if (props.email && !emailRegex.test(text.toLowerCase())) {
			isValid = false
		}

		if (props.min != null && +text < props.min) {
			isValid = false
		}

		if (props.max != null && +text > props.max) {
			isValid = false
		}

		if (props.minLength != null && text.length < props.minLength) {
			isValid = false
		}

		dispatchInputState({
			type: INPUT_CHANGE,
			value: text,
			isValid,
		})
	}

	const lostFocusHandler = () => dispatchInputState({ type: INPUT_BLUR })
	const clearInputHandler = () => dispatchInputState({ type: INPUT_CLEAR })
	const dateInputHandler = (date) => {
		date = new Date(date).toISOString().substring(0, 10).replace(/-/gi, '.')
		dispatchInputState({ type: INPUT_DATE, value: date })
		setDatePickerVisibility(false)
	}

	switch (id) {
		case 'gender':
			return (
				<View style={css.inputGender}>
					<Text style={css.inputText}>Пол:</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<RadioButton
							color={colors.red}
							status={inputState.value == 1 ? 'checked' : 'unchecked'}
							onPress={() => textChangeHandler(1)}
						/>
						<Text style={css.textGender}>Мужской</Text>
						<RadioButton
							color={colors.red}
							status={inputState.value == 0 ? 'checked' : 'unchecked'}
							onPress={() => textChangeHandler(0)}
						/>
						<Text style={css.textGender}>Женский</Text>
					</View>
				</View>
			)

		default:
			return (
				<React.Fragment>
					<View style={css.inputView}>
						<TextInput
							{...props}
							style={css.inputText}
							placeholder={label}
							value={inputState.value}
							onChangeText={textChangeHandler}
							onBlur={lostFocusHandler}
						/>

						{!!inputState.value && !id !== 'birthDate' && (
							<Icon
								name="times-circle"
								color={colors.red}
								size={20}
								onPress={clearInputHandler}
							/>
						)}
						{id === 'birthDate' && (
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => setDatePickerVisibility(true)}
							>
								<Icon name="calendar" color={colors.grey} size={20} />
							</TouchableOpacity>
						)}
					</View>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={dateInputHandler}
						onCancel={() => setDatePickerVisibility(false)}
					/>
				</React.Fragment>
			)
	}
}
