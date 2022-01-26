import React from 'react'
import { Dimensions, Text, View } from 'react-native'
// import { Map, YMaps } from 'react-yandex-maps'
// import YaMap, { Marker } from 'react-native-yamap'
import { fonts } from '../styles/constants'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function TravelScreen({}) {
	// YaMap.init('240cb70c-297a-44da-a3f6-c73039a7c654')
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontFamily: fonts.bold, fontSize: 30 }}>TravelScreen</Text>
		</View>
	)
}
