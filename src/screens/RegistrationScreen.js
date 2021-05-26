import React, { useState } from 'react'
import { Text, View, Dimensions, ScrollView, StyleSheet, Pressable } from 'react-native'
import md5 from 'md5'

import RegField from '../components/regField'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const RegistrationScreen = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [pass, setPass] = useState('')
	const [rpass, setRpass] = useState('')
	const [gender, setGender] = useState('')

	const myHeaders = new Headers()

	const data = new FormData()
	data.append('catalogue', 1)
	data.append('cc', 7)
	data.append('sub', 22)
	data.append('posting', 1)
	data.append('curPos', 0)
	data.append('f_FirstName', firstName)
	data.append('f_LastName', lastName)
	data.append('f_Phone', phone)
	data.append('f_Email', email)
	data.append('f_BirthDate', birthDate)
	data.append('Password1', md5(pass))
	data.append('Password2', md5(rpass))
	data.append('f_Gender', gender)

	let fields = [firstName, lastName, phone, email, birthDate, pass, rpass]

	const checkHandler = () => {
		fields.forEach((f) => {
			if (!f) {
				return console.log(`THERE IS NO `)
			}
		})
	}

	const regHandler = () => {
		checkHandler()
		console.log(data)
	}

	return (
		<React.Fragment>
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<ScrollView
					contentContainerStyle={{
						paddingTop: windowHeight * 0.1,
						alignItems: 'center',
					}}
				>
					<Text style={styles.header}>Регистрация</Text>
					<RegField label="Имя*" value={firstName} setValue={setFirstName} />
					<RegField label="Фамилия*" value={lastName} setValue={setLastName} />
					<RegField label="Телефон*" value={phone} setValue={setPhone} />
					<RegField label="E-mail*" value={email} setValue={setEmail} />
					<RegField label="Дата рождения" value={birthDate} setValue={setBirthDate} />
					<RegField gender value={gender} setValue={setGender} />
					<RegField pass label="Пароль*" value={pass} setValue={setPass} />
					<RegField
						pass
						label="Подтверждение пароля*"
						value={rpass}
						setValue={setRpass}
					/>
					<Pressable
						android_ripple
						onPress={regHandler}
						style={{ ...styles.btn, ...styles.btnLogin }}
					>
						<Text style={{ ...styles.text, color: '#fff' }}>Зарегистрироваться</Text>
					</Pressable>
					<Text style={styles.textBtm}>* отмечены поля обязательные для заполнения</Text>
					<Text style={styles.textBtm}>
						Нажимая кнопку «Зарегистрироваться», вы подтверждаете согласие с условиями
						использования ЛЕХТА и политикой о данных пользователей.
					</Text>
				</ScrollView>
			</View>
		</React.Fragment>
	)
}
export default RegistrationScreen

const styles = StyleSheet.create({
	header: {
		fontFamily: 'gothampro-bold',
		fontSize: 20,
		marginBottom: 20,
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
	textBtm: {
		width: windowWidth * 0.8,
		textAlign: 'center',
		lineHeight: 15,
		marginTop: 20,
		fontFamily: 'gothampro-regular',
		fontSize: 12,
		color: '#868686',
		marginBottom: 20,
	},
})
