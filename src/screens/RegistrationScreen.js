import React, { useState } from 'react'
import {
	Text,
	View,
	Dimensions,
	ScrollView,
	StyleSheet,
	Pressable,
	Alert,
	ActivityIndicator,
} from 'react-native'
import md5 from 'md5'
import Loader from '../components/Loader'
import RegField from '../components/RegField'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const RegistrationScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false)

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [pass, setPass] = useState('')
	const [rpass, setRpass] = useState('')
	const [gender, setGender] = useState('')
	const [errors, setErrors] = useState({
		firstName: { value: firstName, error: false },
		lastName: { value: lastName, error: false },
		phone: { value: phone, error: false },
		email: { value: email, error: false },
		gender: { value: gender, error: false },
		pass: { value: pass, error: false },
		rpass: { value: rpass, error: false },
	})

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
	data.append('Password1', pass)
	data.append('Password2', rpass)
	data.append('f_Gender', gender)

	const regHandler = async () => {
		if (!firstName) return Alert.alert('Ошибка', 'Вы не ввели имя')
		if (!lastName) return Alert.alert('Ошибка', 'Вы не ввели фамилию')
		if (!phone) return Alert.alert('Ошибка', 'Вы не ввели телефон')
		if (!email) return Alert.alert('Ошибка', 'Вы не ввели почту')
		if (!gender) return Alert.alert('Ошибка', 'Вы не указали пол')
		if (!pass) return Alert.alert('Ошибка', 'Вы не ввели пароль')
		if (!rpass) return Alert.alert('Ошибка', 'Вы не ввели подтверждение пароля')
		if (pass !== rpass) return Alert.alert('Ошибка', 'Пароли не совпадают')

		setLoading(true)
		await fetch(`https://lexta.pro/api/CheckLogin.php?user=${email}`, { mode: 'no-cors' })
			.then((res) => res.json())
			.then(async (exist) => {
				if (!exist.status) {
					await fetch('https://lexta.pro/netcat/add.php', {
						method: 'POST',
						mode: 'no-cors',
						headers: new Headers(),
						body: data,
					})
						.then((response) => {
							response.text()
						})
						.then(() => {
							setLoading(false)
							Alert.alert('Регистрация', 'Регистрация прошла успешно!', [
								{
									text: 'Войти',
									onPress: () => {
										navigation.navigate('Login')
									},
								},
							])
						})
						.catch((err) => console.log(err))
				} else {
					Alert.alert('Ошибка', `Пользователь с почтой ${email} уже существует.`)
				}
			})
			.then(() => setLoading(false))
	}

	return (
		<React.Fragment>
			{/* {loading && <Loader />} */}

			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<ScrollView
					contentContainerStyle={{
						paddingTop: windowHeight * 0.1,
						alignItems: 'center',
					}}
				>
					<Text style={styles.header}>Регистрация</Text>
					<RegField
						error={errors.firstName.error}
						label="Имя*"
						value={firstName}
						setValue={setFirstName}
					/>
					<RegField
						error={errors.lastName.error}
						label="Фамилия*"
						value={lastName}
						setValue={setLastName}
					/>
					<RegField
						error={errors.phone.error}
						phone
						label="Телефон*"
						value={phone}
						setValue={setPhone}
					/>
					<RegField
						error={errors.email.error}
						label="E-mail*"
						value={email}
						setValue={setEmail}
					/>
					<RegField
						birthDate
						label="Дата рождения"
						value={birthDate}
						setValue={setBirthDate}
					/>
					<RegField
						error={errors.gender.error}
						gender
						value={gender}
						setValue={setGender}
					/>
					<RegField
						error={errors.pass.error}
						pass
						label="Пароль*"
						value={pass}
						setValue={setPass}
					/>
					<RegField
						error={errors.rpass.error}
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
						<Text style={{ ...styles.text, color: '#fff' }}>
							{loading ? <ActivityIndicator color="#fff" /> : 'Зарегистрироваться'}
						</Text>
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
