import React from 'react'
import { Image, Dimensions } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function Logo({ width = 0.5, height = 0.1, mt = 0, mb = 0 }) {
	return (
		<Image
			source={require('../../assets/logo_login.png')}
			style={{
				width: windowWidth * width,
				height: windowHeight * height,
				marginTop: windowHeight * mt,
				marginBottom: windowHeight * mb,
			}}
			resizeMode={'contain'}
		/>
	)
}
