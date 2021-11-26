import AsyncStorage from '@react-native-async-storage/async-storage'
import md5 from 'md5'
import { useSelector } from 'react-redux'

import LextaService from '../../services/LextaService'
import { SET_PROFILE } from './profile'
const lexta = new LextaService()

export const LOGIN = 'LOGIN'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const LOGOUT = 'LOGOUT'

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
		const responseUpdateToken = await lexta.updateToken(email, token, md5(userid))
		if (responseUpdateToken.ok) {
			const resUpdateTokenData = await responseUpdateToken.json()
			if (resUpdateTokenData.Status) {
				let updatedToken = resUpdateTokenData.Token
				dispatch({
					type: UPDATE_TOKEN,
					token: updatedToken,
				})
				let updatedUserData = JSON.parse(userData)
				const updatedExpirationDate = new Date(new Date().getTime() + 60000 * 5).toISOString()
				updatedUserData = {
					...updatedUserData,
					Token: updatedToken,
					expirationDate: updatedExpirationDate,
				}
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

const saveDataToStorage = (userData) => {
	console.log(userData)
	AsyncStorage.setItem('userData', JSON.stringify(userData))
}
