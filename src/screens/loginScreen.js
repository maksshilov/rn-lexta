import React, { useState } from 'react'
import { Text, View, Dimensions, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native'
import md5 from 'md5'
import Logo from '../components/logo'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const LoginScreen = () => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')

	const loginHandler = async () => {
		await fetch(`https://lexta.pro/api/GetToken.php?user=${login}&password=${md5(pass)}`, {
			mode: 'no-cors',
		})
			.then((res) => res.text())
			.then((data) => console.log(data))
	}
	return (
		<React.Fragment>
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
					<Text style={{ ...styles.text, color: '#fff' }}>Войти</Text>
				</Pressable>
			</ScrollView>
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

export default LoginScreen
