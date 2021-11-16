import React, { useState } from 'react'
import { Text, View, Dimensions, ScrollView, StyleSheet, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native'
import style from '../styles/cssLoginScreen'
import md5 from 'md5'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import LextaService from '../services/LextaService'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const LoginScreen = ({ state, setUserInfo, navigation }) => {
	const lexta = new LextaService()
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [loading, setLoading] = useState(false)
	const { setItem } = useAsyncStorage('@storage_key')

	const writeItemToStorage = async (newValue) => {
		await setItem(newValue)
	}

	const loginHandler = async () => {
		let loginFormat = login.toLowerCase().replace(' ', '')
		lexta
			.getToken(loginFormat, md5(pass))
			.then((res) => {
				setLoading(true)
				return res.json()
			})
			.then((token) => {
				if (token['Status']) {
					lexta
						.getUserInfo(token['Token'], loginFormat)
						.then((res) => {
							return res.json()
						})
						.then((data) => {
							console.log(data)
							const storage = JSON.stringify({
								...data[0],
								Token: token['Token'],
								UserId: token['UserId'],
							})
							writeItemToStorage(storage)

							return data
						})
						.then((data) => {
							setUserInfo({ ...data[0], Token: token['Token'] })
						})
						.then(() => {
							setLoading(false)
							navigation.navigate('Main')
						})
						.catch((e) => console.log(e))
				} else {
					setLoading(false)
					Alert.alert('Ошибка', 'Вы ввели неверные логин и/или пароль.')
				}
			})

			.catch((e) => {
				console.log(e)
			})
	}

	return (
		<React.Fragment>
			{/* {loading && <Loader />} */}
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<ScrollView contentContainerStyle={style.scrollView}>
					<Text style={style.header}>Вход</Text>
					<View style={style.inputView}>
						<TextInput placeholder="Электронная почта" onChangeText={setLogin} value={login} style={style.inputText} />
					</View>
					<View style={style.inputView}>
						<TextInput placeholder="Пароль" textContentType="password" secureTextEntry onChangeText={setPass} style={style.inputText} />
					</View>

					<Pressable
						android_ripple
						onPress={() => {
							if (login && pass) {
								loginHandler()
							} else {
								Alert.alert('Ошибка', 'Вы не ввели логин и/или пароль.')
							}
						}}
						style={{ ...style.btn, ...style.btnLogin }}
					>
						<Text style={{ ...style.text, color: '#fff' }}>{loading ? <ActivityIndicator color="#fff" /> : 'Войти'}</Text>
					</Pressable>
				</ScrollView>
			</View>
		</React.Fragment>
	)
}

// export default LoginScreen

// ----------------------- REDUX start

const mapStateToProps = (state) => {
	return { state }
}
const mapDispatchToProps = (dispatch) => {
	return {
		setUserInfo: (token) => dispatch({ type: 'SET_USER_INFO', payload: token }),
	}
}

// ----------------------- REDUX end

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
