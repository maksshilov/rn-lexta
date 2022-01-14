import React from 'react'
import { View, ScrollView } from 'react-native'
import ProfileDetailsItems from '../components/ProfileDetailsItems'
import { useSelector } from 'react-redux'

export default ProfileDetailsScreen = ({ navigation }) => {
	const { FirstName, LastName, Phone, Email, Gender } = useSelector((state) => state.profile)

	return (
		<React.Fragment>
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
					<ProfileDetailsItems icon="account-outline" content={`${FirstName} ${LastName}`} />
					<ProfileDetailsItems icon="phone" content={Phone} />
					<ProfileDetailsItems icon="email" content={Email} />
					<ProfileDetailsItems gender content={Gender ? 'мужской' : 'женский'} />
				</ScrollView>
			</View>
		</React.Fragment>
	)
}
