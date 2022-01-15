import React from 'react'
import { Image, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fonts } from '../styles/constants'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function SubHeader({ navigation, title }) {
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Elements', { screen: 'News' })
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ width: '80%' }}>
					<Text
						style={{
							fontFamily: fonts.bold,
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
		</TouchableOpacity>
	)
}
