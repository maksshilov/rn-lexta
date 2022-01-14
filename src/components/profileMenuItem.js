import React from 'react'
import { Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ProfileMenuItem({ title, icon, last = false, disable }) {
	return [
		<>
			<View
				style={{
					width: '100%',
					height: 50,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Text style={[{ fontFamily: 'gothampro-regular', fontSize: 13 }, disable ? { color: '#ccc' } : null]}>{title}</Text>
				<MaterialCommunityIcons name={icon} color={disable ? '#ccc' : '#8f2d32'} size={30} />
			</View>
			{/* {last || <View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />} */}
		</>,
	]
}
