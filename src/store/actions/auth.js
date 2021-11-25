import AsyncStorage from '@react-native-async-storage/async-storage'
import md5 from 'md5'
import { useSelector } from 'react-redux'

import LextaService from '../../services/LextaService'
import { SET_PROFILE } from './profile'
const lexta = new LextaService()

export const LOGIN = 'LOGIN'

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
					saveDataToStorage(resTokenData, resUserData[0], expirationDate)
				} else {
					throw new Error('Ошибка профиля')
				}
			} else {
				throw new Error('Ошибка аутентификации')
			}
		} else {
			throw new Error('Проблемы с сервером')
		}
	}
}

const saveDataToStorage = (auth, profile, expirationDate) => {
	const userData = { auth, profile, expirationDate }
	console.log(userData)
	AsyncStorage.setItem('userData', JSON.stringify(userData))
}
