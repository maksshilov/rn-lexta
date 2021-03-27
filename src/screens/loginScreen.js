import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const LoginScreen = () => {
	const loginHandler = () => {
		fetch(
			'https://lexta.kproject.su/api/GetToken.php?user=admin@lexta.kproject.su&password=cbaf40ce7d522f59ece3d21b20aa9f15'
		)
			.then((res) => res.json())
			.then((json) => setToken(json.Token))
	}
	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require('../../assets/bg_login.png')}
				style={{ flex: 1, alignItems: 'center' }}
			>
				<Image
					source={require('../../assets/bg_login.png')}
					style={{ width: 270, marginTop: 170 }}
					resizeMode={'contain'}
				/>
				<View
					style={{
						marginTop: 180,
					}}
				>
					<TouchableOpacity
						onPress={() => loginHandler()}
						style={{
							backgroundColor: '#912e33',
							width: 270,
							height: 50,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 6,
						}}
					>
						<Text
							style={{ fontFamily: 'gothampro-regular', fontSize: 18, color: '#fff' }}
						>
							Войти
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						marginTop: 50,
					}}
				>
					<TouchableOpacity
						style={{
							borderWidth: 2,
							borderColor: '#912e33',
							width: 270,
							height: 50,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 6,
						}}
					>
						<Text
							style={{ fontFamily: 'gothampro-regular', fontSize: 18, color: '#000' }}
						>
							Зарегистрироваться
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	)
}

export default LoginScreen
