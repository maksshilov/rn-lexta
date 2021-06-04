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
} from 'react-native'
import md5 from 'md5'

import Loader from '../components/Loader'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const PassChangeScreen = ({ state, setToken, navigation }) => {
	const [login, setLogin] = useState('')
	const [oldPass, setOldPass] = useState('')
	const [pass, setPass] = useState('')
	const [rpass, setRpass] = useState('')
	const [loading, setLoading] = useState(false)

	const data = new FormData()
	data.append('user', md5(login))
	data.append('pwOld', oldPass)
	data.append('pw1', pass)
	data.append('pw2', rpass)

	const loginHandler = async () => {
		await fetch(`https://lexta.pro/api/ChangePassword.php`, {
			method: 'POST',
			mode: 'no-cors',
			headers: new Headers(),
			body: data,
		})
			.then((res) => {
				setLoading(true)
				return res.json()
			})
			.then((data) => {
				if (data.status) {
					setLoading(false)
					Alert.alert('Изменение пароля', 'Ваш пароль был успешно изменён!', [
						{
							text: 'Вернуться в Настройки',
							onPress: () => {
								navigation.navigate('Profile')
							},
						},
					])
				} else {
					setLoading(false)
					Alert.alert('Error', JSON.stringify(data))
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	return (
		<React.Fragment>
			{loading && <Loader />}
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
					<MaterialCommunityIcons
						name="lock-outline"
						color="#8f2d32"
						size={50}
						style={{ marginTop: 10, marginBottom: 10 }}
					/>

					<View style={styles.inputView}>
						<TextInput
							placeholder="Телефон или электронная почта"
							onChangeText={setLogin}
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Старый пароль"
							textContentType="password"
							secureTextEntry
							onChangeText={setOldPass}
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Новый пароль"
							textContentType="password"
							secureTextEntry
							onChangeText={setPass}
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							placeholder="Новый пароль. Ещё разок"
							textContentType="password"
							secureTextEntry
							onChangeText={setRpass}
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
						<Text style={{ ...styles.text, color: '#fff' }}>Изменить</Text>
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

// export default PassChangeScreen

// ----------------------- REDUX start
const mapStateToProps = (state) => {
	return { state }
}
const mapDispatchToProps = (dispatch) => {
	return {
		setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: token }),
	}
}
// ----------------------- REDUX end

export default connect(mapStateToProps, mapDispatchToProps)(PassChangeScreen)
