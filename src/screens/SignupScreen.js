import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Text, View, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native'
import Loader from '../components/Loader'
import SignupInput from '../components/SignupInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import css from '../styles/cssSignupScreen'
import LextaService from '../services/LextaService'
import { useDispatch } from 'react-redux'
const lexta = new LextaService()

const SIGNUP_FORM_UPDATE = 'SIGNUP_FORM_UPDATE'
const formReducer = (state, action) => {
	if (action.type === SIGNUP_FORM_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		}
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
		},
		inputValidities: {
			firstName: false,
			lastName: false,
			phone: false,
			email: false,
			gender: false,
			pass: false,
			rpass: false,
		},
		formIsValid: false,
	})

	const regHandler = async () => {
		if (!signupInputs.firstName) return Alert.alert('Ошибка', 'Вы не ввели имя')
		if (!signupInputs.lastName) return Alert.alert('Ошибка', 'Вы не ввели фамилию')
		if (!signupInputs.phone) return Alert.alert('Ошибка', 'Вы не ввели телефон')
		if (!signupInputs.email) return Alert.alert('Ошибка', 'Вы не ввели почту')
		if (!signupInputs.gender) return Alert.alert('Ошибка', 'Вы не указали пол')
		if (!signupInputs.pass) return Alert.alert('Ошибка', 'Вы не ввели пароль')
		if (!signupInputs.rpass) return Alert.alert('Ошибка', 'Вы не ввели подтверждение пароля')
		if (signupInputs.pass !== signupInputs.rpass) return Alert.alert('Ошибка', 'Пароли не совпадают')

		setLoading(true)
		lexta
			.checkLogin(signupInputs.email)
			.then((res) => res.json())
			.then(async (exist) => {
				if (!exist.status) {
					lexta
						.signup(signupInputs)
						.then((response) => {
							response.text()
						})
						.then(() => {
							setLoading(false)
							Alert.alert('Регистрация', 'Регистрация прошла успешно!', [
								{
									text: 'Войти',
									onPress: () => {
										navigation.navigate('Login')
									},
								},
							])
						})
						.catch((err) => console.log(err))
				} else {
					Alert.alert('Ошибка', `Пользователь с почтой ${email} уже существует.`)
				}
			})
			.then(() => setLoading(false))
	}

	const inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
		dispatchFormState({
			type: SIGNUP_FORM_UPDATE,
			value: inputValue,
			isValid: inputValidity,
			input: inputIdentifier,
		})
	}

	return (
		<React.Fragment>
			{/* {loading && <Loader />} */}

			<View style={css.view}>
				<ScrollView contentContainerStyle={css.scrollView}>
					<Text style={css.header}>Регистрация</Text>
					<SignupInput
						// error={errors.firstName.error}
						label="Имя*"
						value={formState.firstName}
						setValue={inputChangeHandler.bind(this, 'firstName')}
					/>
					<SignupInput
						// error={errors.lastName.error}
						label="Фамилия*"
						value={formState.lastName}
						setValue={inputChangeHandler.bind(this, 'lastName')}
					/>
					<SignupInput
						// error={errors.phone.error}
						phone
						label="Телефон*"
						value={formState.phone}
						setValue={inputChangeHandler.bind(this, 'phone')}
					/>
					<SignupInput
						// error={errors.email.error}
						label="E-mail*"
						value={formState.email}
						setValue={inputChangeHandler.bind(this, 'email')}
					/>
					<SignupInput birthDate label="Дата рождения" value={formState.birthDate} setValue={inputChangeHandler.bind(this, 'birthDate')} />
					<SignupInput
						// error={errors.gender.error}
						gender
						value={formState.gender}
						setValue={inputChangeHandler.bind(this, 'gender')}
					/>
					<SignupInput
						// error={errors.pass.error}
						pass
						label="Пароль*"
						value={formState.pass}
						setValue={inputChangeHandler.bind(this, 'pass')}
					/>
					<SignupInput
						// error={errors.rpass.error}
						pass
						label="Подтверждение пароля*"
						value={formState.rpass}
						setValue={inputChangeHandler.bind(this, 'rpass')}
					/>
					<Pressable android_ripple onPress={() => console.log('SUBMIT > ', formState)} style={[css.btn, css.btnLogin]}>
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
