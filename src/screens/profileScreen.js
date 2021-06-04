import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileMenuItem from '../components/ProfileMenuItem'
import ProfileMenuSection from '../components/ProfileMenuSection'
import { connect } from 'react-redux'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const ProfileScreen = ({ navigation, state, clearState }) => {
	const { FirstName, LastName } = state.reducerUser
	const { removeItem } = useAsyncStorage('@storage_key')

	const removeItemFromStorage = async () => {
		await removeItem()
	}

	return (
		<ScrollView
			contentContainerStyle={{ flex: 0, paddingHorizontal: 10, backgroundColor: '#fff' }}
		>
			<View style={{ paddingTop: windowHeight * 0.05, alignItems: 'center' }}>
				<View style={{ paddingVertical: 10 }}>
					<MaterialCommunityIcons name="account-circle" size={80} color="grey" />
				</View>
				<Text style={{ fontFamily: 'gothampro-bold', fontSize: 22 }}>
					{FirstName} {LastName}
				</Text>
			</View>
			<View
				style={{
					height: 3,
					width: '100%',
					backgroundColor: '#d0d0d0',
					marginTop: 20,
				}}
			/>
			<ProfileMenuSection title="НАСТРОЙКИ АККАУНТА" />
			<TouchableOpacity android_ripple onPress={() => navigation.navigate('ProfileDetails')}>
				<ProfileMenuItem title="Персональные данные" icon="account-outline" />
			</TouchableOpacity>
			<TouchableOpacity android_ripple onPress={() => navigation.navigate('PassChange')}>
				<ProfileMenuItem title="Изменить пароль" icon="lock-outline" />
			</TouchableOpacity>
			<ProfileMenuItem title="Мои объявления" icon="format-list-bulleted-square" />
			<ProfileMenuItem title="Мои подписки" icon="email-newsletter" />
			<ProfileMenuItem title="Избранное" icon="heart-outline" />
			<ProfileMenuItem title="Изменение цен" icon="update" />
			<ProfileMenuItem title="Сообщения" icon="forum-outline" last />
			<ProfileMenuSection title="ПОДДЕРЖКА" />

			<ProfileMenuItem title="Как устроена платформа ЛЕХТА" icon="wan" />
			<ProfileMenuItem title="Помощь" icon="help" />
			<TouchableOpacity
				android_ripple
				onPress={() => {
					removeItemFromStorage()
					clearState()
					navigation.navigate('Start')
				}}
			>
				<ProfileMenuItem title="Выйти" icon="logout" last />
			</TouchableOpacity>
		</ScrollView>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
const mapDispathToProps = (dispatch) => {
	return {
		clearState: () => dispatch({ type: 'CLEAR' }),
	}
}
export default connect(mapStateToProps, mapDispathToProps)(ProfileScreen)
