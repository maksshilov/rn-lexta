import React, { useState } from 'react'
import {
	Text,
	View,
	Dimensions,
	ScrollView,
	StyleSheet,
	Pressable,
	TextInput,
	Alert,
	ActivityIndicator,
} from 'react-native'
import md5 from 'md5'

import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import Loader from '../components/loader'
import { handlePressIn, handlePressOut } from '../components/animatedScale'

import { connect } from 'react-redux'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const LoginScreen = ({ state, setUserInfo, navigation }) => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [loading, setLoading] = useState(false)
	const { setItem } = useAsyncStorage('@storage_key')

	const writeItemToStorage = async (newValue) => {
		await setItem(newValue)
	}

	const loginHandler = async () => {
		await fetch(`https://lexta.pro/api/GetToken.php?user=${login}&password=${md5(pass)}`, {
			mode: 'no-cors',
		})
			.then((res) => {
				setLoading(true)
				return res.json()
			})
			.then((token) => {
				if (token['Status']) {
					fetch(
						`https://lexta.pro/api/GetUserInfo.php?token=${token['Token']}&user=${login}`,
						{
							mode: 'no-cors',
						}
					)
						.then((res) => res.json())
						.then((data) => {
							const storage = JSON.stringify({
								...data[0],
								Token: token['Token'],
							})
							writeItemToStorage(storage)

							return data
						})
						.then((data) => setUserInfo({ ...data[0], Token: token['Token'] }))
						.then(() => setLoading(false))
						.catch((e) => console.log(e))
				} else {
					Alert.alert('Ошибка', JSON.stringify(token))
				}
				return token
			})
			.then((token) => {
				if (!token['Status']) {
					setLoading(false)
					Alert.alert('Ошибка', JSON.stringify(token))
				} else {
					setLoading(false)
					navigation.navigate('Main')
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
				<ScrollView
					contentContainerStyle={{ marginTop: windowHeight * 0.1, alignItems: 'center' }}
				>
					<Text style={styles.header}>Вход</Text>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Телефон или электронная почта"
							onChangeText={setLogin}
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Пароль"
							textContentType="password"
							secureTextEntry
							onChangeText={setPass}
							style={styles.inputText}
						/>
					</View>

					<Pressable
						android_ripple
						onPress={() => {
							if (login && pass) {
								loginHandler()
							} else {
								console.log('err')
							}
						}}
						style={{ ...styles.btn, ...styles.btnLogin }}
					>
						<Text style={{ ...styles.text, color: '#fff' }}>
							{loading ? <ActivityIndicator color="#fff" /> : 'Войти'}
						</Text>
					</Pressable>
				</ScrollView>
			</View>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	header: {
		fontFamily: 'gothampro-bold',
		fontSize: 20,
		marginBottom: 20,
	},
	inputView: {
		paddingLeft: 15,
		justifyContent: 'center',
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#868686',
		marginBottom: 20,
	},
	inputText: {
		color: '#fdfffc',
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
})

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
