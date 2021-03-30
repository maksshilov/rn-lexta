import React from 'react'
import { Image, View, Dimensions, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function Header({ navigation, scrollY }) {
	const touchScaleK = React.useRef(new Animated.Value(1)).current

	const handlePressIn = () => {
		Animated.spring(touchScaleK, {
			toValue: 0.75,
			useNativeDriver: false,
		}).start()
	}
	const handlePressOut = () => {
		Animated.spring(touchScaleK, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: false,
		}).start()
		navigation.navigate('Profile')
	}

	return (
		<Animated.View
			style={{
				flexDirection: 'row',
				paddingTop: windowHeight * 0.05,
				paddingBottom: windowHeight * 0.01,
				alignItems: 'center',
				backgroundColor: '#fff',
				elevation: scrollY.interpolate({
					inputRange: [0, 10],
					outputRange: [0, 10],
					extrapolate: 'clamp',
				}),
			}}
		>
			<View
				style={{
					width: windowWidth * 0.3,
				}}
			></View>
			<Image
				source={require('../../assets/logo_login.png')}
				style={{
					height: windowHeight * 0.05,
					width: windowWidth * 0.4,
				}}
				resizeMode="contain"
			/>
			<View
				style={{
					width: windowWidth * 0.3,
					alignItems: 'flex-end',
					paddingRight: 20,
				}}
			>
				<Animated.View style={{ transform: [{ scale: touchScaleK }] }}>
					<TouchableOpacity
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}
						activeOpacity={0.7}
					>
						<MaterialCommunityIcons name="account-circle" size={40} color="grey" />
					</TouchableOpacity>
				</Animated.View>
			</View>
		</Animated.View>
	)
}
