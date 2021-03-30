import React from 'react'
import { Image, Text, View, Dimensions, Animated } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function SubHeader({ title }) {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<View style={{ width: '80%' }}>
				<Text
					style={{
						fontFamily: 'gothampro-bold',
						fontSize: 15,
						marginLeft: 10,
						marginBottom: 10,
						marginTop: windowHeight * 0.02,
					}}
				>
					{title}
				</Text>
			</View>
			<View style={{ width: '20%', alignItems: 'flex-end', paddingRight: 10 }}>
				<MaterialCommunityIcons name="arrow-right" color="grey" size={20} />
			</View>
		</View>
	)
}
