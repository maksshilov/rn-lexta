import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function Loader() {
	return (
		<View
			style={{
				position: 'absolute',
				zIndex: 1,
				flex: 1,
				backgroundColor: 'rgba(0,0,0,0.5)',
				width: windowWidth,
				height: windowHeight,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ActivityIndicator size="large" color="#912e33" />
		</View>
	)
}
