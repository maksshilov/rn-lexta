import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Text, View, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'

import * as authActions from '../store/actions/auth'
import css from '../styles/cssLoginScreen'

const LOGIN_FORM_UPDATE = 'LOGIN_FORM_UPDATE'
const formReducer = (state, action) => {
	if (action.type === LOGIN_FORM_UPDATE) {
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

export default LoginScreen = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const dispatch = useDispatch()

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	})

	useEffect(() => {
		if (error) Alert.alert('Ошибка', error, [{ text: 'Ok' }])
	}, [error])

	const loginHandler = async () => {
		setError(null)
		setLoading(true)
		try {
			let { email, password } = formState.inputValues
			await dispatch(authActions.login(email, password))
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: LOGIN_FORM_UPDATE,
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
					<Text style={css.header}>Вход</Text>
					<View style={css.inputView}>
						<TextInput
							placeholder="Электронная почта"
							onChangeText={inputChangeHandler.bind(this, 'email')} // the same as beneath
							// onChangeText={(value) => inputChangeHandler('email', value)}
							style={css.inputText}
						/>
					</View>
					<View style={css.inputView}>
						<TextInput
							placeholder="Пароль"
							textContentType="password"
							secureTextEntry
							onChangeText={inputChangeHandler.bind(this, 'password')} // the same as beneath
							// onChangeText={(value) => inputChangeHandler('password', value)}
							style={css.inputText}
						/>
					</View>

					<Pressable android_ripple onPress={loginHandler} style={[css.btn, css.btnLogin]}>
						<Text style={css.text}>{loading ? <ActivityIndicator color="#fff" /> : 'Войти'}</Text>
					</Pressable>
				</ScrollView>
			</View>
		</React.Fragment>
	)
}
