import React from 'react'
import {
	ImageBackground,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Animated,
	Alert,
} from 'react-native'
import Logo from '../components/Logo'
import { handlePressIn, handlePressOut } from '../components/AnimatedScale'
import css from '../styles/cssStartScreen'
import { ncAuthAddObj, ncAuthAxios, ncAuthFetch } from '../ncAuth'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function StartScreen({ navigation }) {
	const [count, setCount] = React.useState(0)
	// const touchScaleLogin = React.useRef(new Animated.Value(1)).current
	// const touchScaleReg = React.useRef(new Animated.Value(1)).current

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require('../../assets/bg_login.png')}
				style={{ flex: 1, alignItems: 'center' }}
			>
				<Logo width={0.67} mt={0.2} />

				<View style={{ marginTop: 180 }}>
					<TouchableOpacity
						onPressOut={() => navigation.navigate('Login')}
						style={[css.btn, css.btnLogin]}
						activeOpacity={0.7}
					>
						<Text style={css.text}>Войти</Text>
					</TouchableOpacity>
				</View>

				<View style={{ marginTop: 50 }}>
					<TouchableOpacity
						onPressOut={() => navigation.navigate('Registration')}
						style={[css.btn, css.btnReg]}
						activeOpacity={0.7}
					>
						<Text style={[css.text, { color: '#000' }]}>Зарегистрироваться</Text>
					</TouchableOpacity>
				</View>

				<View
					style={{
						flexDirection: 'row',
						marginTop: 20,
						justifyContent: 'space-around',
						width: windowWidth,
					}}
				>
					<View style={{ alignItems: 'center' }}>
						<TouchableOpacity
							onPress={() => ncAuthFetch('qwe@qwe.qwe', 'qwe')}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 15,
								width: windowWidth * 0.3,
								height: windowWidth * 0.1,
								backgroundColor: '#74c8b4',
							}}
						>
							<Text>QWE</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ fontSize: 20 }}>{count - 1}</Text>
					<View style={{ alignItems: 'center' }}>
						<TouchableOpacity
							onPress={() => ncAuthFetch('zxc@zxc.zxc', 'zxc')}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 15,
								width: windowWidth * 0.3,
								height: windowWidth * 0.1,
								backgroundColor: '#79c874',
							}}
						>
							<Text>ZXC</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ width: windowWidth, alignItems: 'center', marginTop: 20 }}>
					<TouchableOpacity
						onPress={() => {
							ncAuthAddObj(count)
							setCount(count + 1)
						}}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 15,
							width: windowWidth * 0.3,
							height: windowWidth * 0.1,
							backgroundColor: '#c8b374',
						}}
					>
						<Text>Object</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	)
}
