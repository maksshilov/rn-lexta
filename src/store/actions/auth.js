import AsyncStorage from '@react-native-async-storage/async-storage'
import md5 from 'md5'
import { Alert } from 'react-native'

import LextaService from '../../services/LextaService'
import { SET_PROFILE } from './profile'
const lexta = new LextaService()

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const LOGOUT = 'LOGOUT'

export const signup = (signupData, navigation) => {
	const { email } = signupData
	return async () => {
		const responseCheckEmail = await lexta.checkLogin(email)
		if (responseCheckEmail.ok) {
			const exist = await responseCheckEmail.json()
			// console.log(exist)
			if (!exist.status) {
				const responseSignup = await lexta.signup(signupData)
				if (responseSignup.ok) {
					Alert.alert('Регистрация', 'Регистрация прошла успешно!', [
						{
							text: 'Войти',
							onPress: () => navigation.navigate('Login'),
						},
					])
				} else {
					throw new Error('Проблемы с регистрацией')
				}
			} else {
				throw new Error('Пользователь с таким email уже существует')
			}
		} else {
			throw new Error('Проблемы с проверкой почты')
		}
	}
}

export const login = (email, password) => {
	return async (dispatch) => {
		const responseToken = await lexta.getToken(email, md5(password))

		if (responseToken.ok) {
			const resTokenData = await responseToken.json()
			if (resTokenData.Status) {
				let { Token, UserId } = resTokenData
				const responseUser = await lexta.getUserInfo(Token, email)
				if (responseUser.ok) {
					const resUserData = await responseUser.json()

					dispatch({
						type: LOGIN,
						token: Token,
						userId: UserId,
					})

					dispatch({
						type: SET_PROFILE,
						payload: resUserData[0],
					})

					const expirationDate = new Date(new Date().getTime() + 60000 * 5).toISOString()
					saveDataToStorage({ ...resTokenData, ...resUserData[0], expirationDate })
				} else {
					throw new Error('Ошибка записи данных')
				}
			} else {
				throw new Error('Ошибка аутентификации')
			}
		} else {
			throw new Error('Проблемы с сервером')
		}
	}
}

export const setDidTryAL = () => {
	return { type: SET_DID_TRY_AL }
}

export const updateTokenAction = (email, token, userid, userData) => {
	return async (dispatch) => {
		console.log('inputs:', email, token, userid, userData)
		console.log('updateTokenAction > start')
		const responseUpdateToken = await lexta.updateToken(email, token, md5(userid))
		if (responseUpdateToken.ok) {
			console.log('responseUpdateToken.ok >', responseUpdateToken.ok)
			const resUpdateTokenData = await responseUpdateToken.json()
			if (resUpdateTokenData.Status) {
				console.log('resUpdateTokenData.Status >', resUpdateTokenData.Status)
				let updatedToken = resUpdateTokenData.Token
				dispatch({
					type: UPDATE_TOKEN,
					token: updatedToken,
				})

				let oldUserData = JSON.parse(userData)
				console.log('oldUserData', oldUserData)
				const updatedExpirationDate = new Date(new Date().getTime() + 60000 * 5).toISOString()
				updatedUserData = {
					...oldUserData,
					Token: updatedToken,
					expirationDate: updatedExpirationDate,
				}
				console.log('updatedUserData', updatedUserData)
				saveDataToStorage(updatedUserData)
			} else {
				throw new Error('Ошибка токена')
			}
		} else {
			throw new Error('Проблемы с сервером')
		}
	}
}

export const logout = () => {
	AsyncStorage.removeItem('userData')
	return { type: LOGOUT }
}

const saveDataToStorage = async (userData) => {
	await AsyncStorage.setItem('userData', JSON.stringify(userData))
}
