import React, { useState } from 'react'
import { Text, View, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native'
import Loader from '../components/Loader'
import SignupInput from '../components/SignupInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import css from '../styles/cssSignupScreen'
import LextaService from '../services/LextaService'
const lexta = new LextaService()

export default function SignupScreen({ navigation }) {
	const [loading, setLoading] = useState(false)

	const [signupInputs, setsignupInputs] = useState({ firstName: '', lastName: '', phone: '', email: '', gender: null, pass: '', rpass: '' })
	const [errors, setErrors] = useState({
		firstName: { value: signupInputs.firstName, error: false },
		lastName: { value: signupInputs.lastName, error: false },
		phone: { value: signupInputs.phone, error: false },
		email: { value: signupInputs.email, error: false },
		gender: { value: signupInputs.gender, error: false },
		pass: { value: signupInputs.pass, error: false },
		rpass: { value: signupInputs.rpass, error: false },
	})

	const regHandler = async () => {
		if (!signupInputs.firstName) return Alert.alert('Ошибка', 'Вы не ввели имя')
		if (!signupInputs.lastName) return Alert.alert('Ошибка', 'Вы не ввели фамилию')
		if (!signupInputs.phone) return Alert.alert('Ошибка', 'Вы не ввели телефон')
		if (!signupInputs.email) return Alert.alert('Ошибка', 'Вы не ввели почту')
		if (!signupInputs.gender) return Alert.alert('Ошибка', 'Вы не указали пол')
		if (!signupInputs.pass) return Alert.alert('Ошибка', 'Вы не ввели пароль')
		if (!signupInputs.rpass) return Alert.alert('Ошибка', 'Вы не ввели подтверждение пароля')
		if (signupInputs.pass !== signupInputs.rpass) return Alert.alert('Ошибка', 'Пароли не совпадают')

		setLoading(true)
		lexta
			.checkLogin(signupInputs.email)
			.then((res) => res.json())
			.then(async (exist) => {
				if (!exist.status) {
					lexta
						.signup(signupInputs)
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

			<View style={css.view}>
				<ScrollView contentContainerStyle={css.scrollView}>
					<Text style={css.header}>Регистрация</Text>
					<SignupInput
						error={errors.firstName.error}
						label="Имя*"
						value={signupInputs.firstName}
						setValue={(input) => setsignupInputs({ ...signupInputs, firstName: input })}
					/>
					<SignupInput
						error={errors.lastName.error}
						label="Фамилия*"
						value={signupInputs.lastName}
						setValue={(input) => setsignupInputs({ ...signupInputs, lastName: input })}
					/>
					<SignupInput
						error={errors.phone.error}
						phone
						label="Телефон*"
						value={signupInputs.phone}
						setValue={(input) => setsignupInputs({ ...signupInputs, phone: input })}
					/>
					<SignupInput
						error={errors.email.error}
						label="E-mail*"
						value={signupInputs.email}
						setValue={(input) => setsignupInputs({ ...signupInputs, email: input })}
					/>
					<SignupInput
						birthDate
						label="Дата рождения"
						value={signupInputs.birthDate}
						setValue={(input) => setsignupInputs({ ...signupInputs, birthDate: input })}
					/>
					<SignupInput
						error={errors.gender.error}
						gender
						value={signupInputs.gender}
						setValue={(input) => setsignupInputs({ ...signupInputs, gender: input })}
					/>
					<SignupInput
						error={errors.pass.error}
						pass
						label="Пароль*"
						value={signupInputs.pass}
						setValue={(input) => setsignupInputs({ ...signupInputs, pass: input })}
					/>
					<SignupInput
						error={errors.rpass.error}
						pass
						label="Подтверждение пароля*"
						value={signupInputs.rpass}
						setValue={(input) => setsignupInputs({ ...signupInputs, rpass: input })}
					/>
					<Pressable android_ripple onPress={regHandler} style={[css.btn, css.btnLogin]}>
						<Text style={css.text}>{loading ? <ActivityIndicator color="#fff" /> : 'Зарегистрироваться'}</Text>
					</Pressable>
					<Text style={css.textBtm}>* отмечены поля обязательные для заполнения</Text>
					<Text style={css.textBtm}>
						Нажимая кнопку «Зарегистрироваться», вы подтверждаете согласие с условиями использования ЛЕХТА и политикой о данных
						пользователей.
					</Text>
				</ScrollView>
			</View>
		</React.Fragment>
	)
}
