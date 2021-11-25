import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Dimensions, Animated, Alert } from 'react-native'
import Logo from '../components/Logo'
import { handlePressIn, handlePressOut } from '../components/AnimatedScale'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function StartScreen({ navigation }) {
	// const touchScaleLogin = React.useRef(new Animated.Value(1)).current
	// const touchScaleReg = React.useRef(new Animated.Value(1)).current

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground source={require('../../assets/bg_login.png')} style={{ flex: 1, alignItems: 'center' }}>
				<Logo width={0.67} mt={0.2} />

				<View style={{ marginTop: 180 }}>
					<TouchableOpacity
						onPressOut={() => navigation.navigate('Login')}
						style={{ ...styles.btn, ...styles.btnLogin }}
						activeOpacity={0.7}
					>
						<Text style={{ ...styles.text, color: '#fff' }}>Войти</Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 50 }}>
					<TouchableOpacity
						onPressOut={() => navigation.navigate('Registration')}
						style={{ ...styles.btn, ...styles.btnReg }}
						activeOpacity={0.7}
					>
						<Text style={{ ...styles.text, color: '#000' }}>Зарегистрироваться</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	btn: {
		width: 270,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
	},
	btnLogin: {
		backgroundColor: '#912e33',
	},
	btnReg: {
		borderWidth: 2,
		borderColor: '#912e33',
	},
	text: {
		fontFamily: 'gothampro-regular',
		fontSize: 18,
	},
})
