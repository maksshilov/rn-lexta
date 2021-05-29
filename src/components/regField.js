import React from 'react'
import { View, Dimensions, StyleSheet, TextInput, Text } from 'react-native'
import { RadioButton } from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function RegField({
	label,
	value = true,
	setValue,
	pass,
	gender = false,
	phone,
	error = false,
}) {
	const passProps = pass ? { secureTextEntry: true, textContentType: 'password' } : false
	const phoneProps = phone ? { keyboardType: 'phone-pad' } : false
	// console.log(error)
	return !gender ? (
		<View
			style={[
				styles.inputView,
				// !value && styles.error
			]}
		>
			<TextInput
				placeholder={label}
				style={styles.inputText}
				value={value}
				onChangeText={(e) => setValue(e)}
				{...passProps}
				{...phoneProps}
			/>
			{value ? (
				<Icon
					name="times-circle"
					color={'#912e33'}
					size={20}
					onPress={() => setValue('')}
				/>
			) : (
				false
			)}
		</View>
	) : (
		<View style={styles.inputGender}>
			<Text style={styles.inputText}>Пол:</Text>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<RadioButton
					color="#912e33"
					status={value === 1 ? 'checked' : 'uncheked'}
					onPress={() => setValue(1)}
				/>
				<Text style={{ ...styles.textGender, marginRight: 20 }}>Мужской</Text>
				<RadioButton
					color="#912e33"
					status={value === 0 ? 'checked' : 'uncheked'}
					onPress={() => setValue(0)}
				/>
				<Text style={styles.textGender}>Женщина</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	inputView: {
		paddingLeft: 15,
		paddingRight: 20,
		justifyContent: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#868686',
		marginBottom: 20,
	},
	error: {
		backgroundColor: 'rgba(255,0,0,0.3)',
	},
	inputText: {
		width: windowWidth * 0.65,
		fontFamily: 'gothampro-regular',
		fontSize: 15,
		color: '#868686',
	},
	btn: {
		width: windowWidth * 0.8,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
	},
	btnLogin: {
		backgroundColor: '#912e33',
	},
	text: {
		fontFamily: 'gothampro-regular',
		fontSize: 18,
	},
	inputGender: {
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		paddingLeft: 15,
		marginBottom: 20,
	},
	textGender: {
		fontFamily: 'gothampro-regular',
		fontSize: 15,
		color: '#868686',
	},
})
