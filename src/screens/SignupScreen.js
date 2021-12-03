import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Text, View, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native'
import SignupInput from '../components/SignupInput'
import css from '../styles/cssSignupScreen'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/auth'

const SIGNUP_FORM_UPDATE = 'SIGNUP_FORM_UPDATE'
const formReducer = (state, action) => {
	if (action.type === SIGNUP_FORM_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		}
		action.input !== 'birthDate' ? action.isValid : (action.isValid = true)
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		}
		let updatedFormIsValid = true
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
		}
		return {
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid: updatedFormIsValid,
		}
	}
	return state
}

export default function SignupScreen({ navigation }) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const dispatch = useDispatch()

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			gender: '',
			pass: '',
			rpass: '',
			birthDate: '',
		},
		inputValidities: {
			firstName: false,
			lastName: false,
			phone: false,
			email: false,
			gender: false,
			pass: false,
			rpass: false,
			birthDate: true,
		},
		formIsValid: false,
	})

	useEffect(() => {
		if (error) Alert.alert('Ошибка', error, [{ text: 'Ещё раз' }])
	}, [error])

	const submitHandler = async () => {
		const { firstName, lastName, phone, email, gender, pass, rpass } = formState.inputValidities
		if (pass !== rpass) return Alert.alert('Ошибка', 'Пароли не совпадают')
		if (!firstName) return Alert.alert('Ошибка', 'Введите Ваше имя')
		if (!lastName) return Alert.alert('Ошибка', 'Введите Вашу фамилию')
		if (!phone) return Alert.alert('Ошибка', 'Введите Ваш номер телефона')
		if (!email) return Alert.alert('Ошибка', 'Введите Вашу почту')
		if (!gender) return Alert.alert('Ошибка', 'Укажите Ваш пол')
		if (!pass) return Alert.alert('Ошибка', 'Введите пароль')
		if (!rpass) return Alert.alert('Ошибка', 'Введите подтверждённый пароль')
		if (formState.inputValues.pass !== formState.inputValues.rpass) return Alert.alert('Ошибка', 'Пароли не совпадают')

		setError(null)
		setLoading(true)
		try {
			await dispatch(signup(formState.inputValues, navigation))
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}
	console.log(error)
	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: SIGNUP_FORM_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			})
		},
		[dispatchFormState]
	)

	return (
		<React.Fragment>
			<View style={css.view}>
				<ScrollView contentContainerStyle={css.scrollView}>
					<Text style={css.header}>Регистрация</Text>
					<SignupInput
						id="firstName"
						label="Имя*"
						value={formState.firstName}
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						required
					/>
					<SignupInput
						id="lastName"
						label="Фамилия*"
						value={formState.lastName}
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						required
					/>
					<SignupInput
						id="phone"
						phone
						label="Телефон*"
						value={formState.phone}
						keyboardType="phone-pad"
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						required
					/>
					<SignupInput
						email
						id="email"
						label="E-mail*"
						value={formState.email}
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						required
					/>
					<SignupInput id="birthDate" birthDate label="Дата рождения" value={formState.birthDate} onInputChange={inputChangeHandler} />
					<SignupInput id="gender" value={formState.gender} onInputChange={inputChangeHandler} />
					<SignupInput
						id="pass"
						label="Пароль*"
						value={formState.pass}
						secureTextEntry={true}
						textContentType="password"
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						required
					/>
					<SignupInput
						id="rpass"
						label="Подтверждение пароля*"
						value={formState.rpass}
						secureTextEntry={true}
						returnKeyType="next"
						textContentType="password"
						onInputChange={inputChangeHandler}
						required
					/>
					<Pressable android_ripple onPress={submitHandler} style={[css.btn, css.btnLogin]}>
						<Text style={css.text}>{loading ? <ActivityIndicator color="#fff" /> : 'Зарегистрироваться'}</Text>
					</Pressable>
					<Text style={css.textBtm}>* отмечены поля обязательные для заполнения</Text>
					<Text style={css.textBtm}>
						Нажимая кнопку «Зарегистрироваться», вы подтверждаете согласие с условиями использования ЛЕХТА и политикой о данных
						пользователей.
					</Text>
				</ScrollView>
			</View>
		</React.Fragment>
	)
}
