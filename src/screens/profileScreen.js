import React from 'react'
import { Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'

import ProfileMenuItem from '../components/ProfileMenuItem'
import ProfileMenuSection from '../components/ProfileMenuSection'
import { logout } from '../store/actions/auth'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch()
	const { FirstName, LastName, Photo } = useSelector((state) => state.profile)

	return (
		<ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#fff' }}>
			<View style={{ paddingTop: windowHeight * 0.05, alignItems: 'center' }}>
				<TouchableOpacity onPress={() => navigation.navigate('ProfileMenu', { screen: 'Ava' })}>
					<View style={{ paddingVertical: 10 }}>
						{Boolean(Photo.split('/').pop()) ? (
							<Image source={{ uri: Photo }} style={{ width: 80, height: 80, borderRadius: 100 }} resizeMethod="scale" />
						) : (
							<MaterialCommunityIcons name="account-circle" size={80} color="grey" />
						)}
					</View>
				</TouchableOpacity>
				<Text style={{ fontFamily: 'gothampro-bold', fontSize: 22 }}>
					{FirstName} {LastName}
				</Text>
			</View>
			<View style={{ height: 3, width: '100%', backgroundColor: '#d0d0d0', marginTop: 20 }} />
			<ProfileMenuSection title="НАСТРОЙКИ АККАУНТА" />
			<TouchableOpacity android_ripple onPress={() => navigation.navigate('ProfileMenu', { screen: 'ProfileDetails' })}>
				<ProfileMenuItem key={1} title="Персональные данные" icon="account-outline" />
			</TouchableOpacity>
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<TouchableOpacity android_ripple onPress={() => navigation.navigate('ProfileMenu', { screen: 'PassChange' })}>
				<ProfileMenuItem key={2} title="Изменить пароль" icon="lock-outline" />
			</TouchableOpacity>
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<TouchableOpacity android_ripple onPress={() => navigation.navigate('ProfileMenu', { screen: 'MyObjects' })}>
				<ProfileMenuItem key={3} title="Мои объявления" icon="format-list-bulleted-square" />
			</TouchableOpacity>
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<ProfileMenuItem key={4} title="Мои подписки" icon="email-newsletter" disable />
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<TouchableOpacity android_ripple onPress={() => navigation.navigate('ProfileMenu', { screen: 'FavScreen' })}>
				<ProfileMenuItem key={5} title="Избранное" icon="heart-outline" />
			</TouchableOpacity>
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<ProfileMenuItem key={6} title="Изменение цен" icon="update" disable />
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<TouchableOpacity onPress={() => navigation.navigate('Elements', { screen: 'MessagesStack' })}>
				<ProfileMenuItem key={7} title="Сообщения" icon="forum-outline" last />
			</TouchableOpacity>

			<ProfileMenuSection title="ПОДДЕРЖКА" />

			<ProfileMenuItem key={8} title="Как устроена платформа ЛЕХТА" icon="wan" disable />
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<ProfileMenuItem key={9} title="Помощь" icon="help" disable />
			<View style={{ height: 1, width: '100%', backgroundColor: '#d0d0d0' }} />
			<TouchableOpacity
				android_ripple
				onPress={() => {
					dispatch(logout())
				}}
			>
				<ProfileMenuItem key={10} title="Выйти" icon="logout" last />
			</TouchableOpacity>
		</ScrollView>
	)
}
