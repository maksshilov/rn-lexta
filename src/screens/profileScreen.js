import React from 'react'
import {
	Image,
	ImageBackground,
	Text,
	View,
	Dimensions,
	SectionList,
	Pressable,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileMenuItem from '../components/profileMenuItem'
import ProfileMenuSection from '../components/profileMenuSection'
import { connect } from 'react-redux'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const ProfileScreen = ({ navigation, state }) => {
	const { removeItem } = useAsyncStorage('@storage_key')
	const removeItemFromStorage = async () => {
		const item = await removeItem()
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
					{state.FirstName} {state.LastName}
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
			<ProfileMenuItem title="Персональные данные" icon="account-outline" />
			<Pressable android_ripple onPress={() => navigation.navigate('PassChange')}>
				<ProfileMenuItem title="Изменить пароль" icon="lock-outline" />
			</Pressable>
			<ProfileMenuItem title="Мои объявления" icon="format-list-bulleted-square" />
			<ProfileMenuItem title="Мои подписки" icon="email-newsletter" />
			<ProfileMenuItem title="Избранное" icon="heart-outline" />
			<ProfileMenuItem title="Изменение цен" icon="update" />
			<ProfileMenuItem title="Сообщения" icon="forum-outline" last />
			<ProfileMenuSection title="ПОДДЕРЖКА" />

			<ProfileMenuItem title="Как устроена платформа ЛЕХТА" icon="wan" />
			<ProfileMenuItem title="Помощь" icon="help" />
			<Pressable
				android_ripple
				onPress={() => {
					removeItemFromStorage()
					navigation.navigate('Start')
				}}
			>
				<ProfileMenuItem title="Выйти" icon="logout" last />
			</Pressable>
		</ScrollView>
	)
}

const mapStateToProps = (state) => {
	return { state }
}
export default connect(mapStateToProps)(ProfileScreen)
