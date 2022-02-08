import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { numSplit } from './scripts'
import PhoneShow from './PhoneShow'
import Like from './Like'
import { fonts } from '../styles/constants'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ObjectCard({ item, userFavorites, navigation }) {
	return (
		<View style={{ width: windowWidth, alignItems: 'center', paddingTop: 20 }}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Elements', {
						screen: 'Object',
						params: { item },
					})
				}}
				android_ripple
				activeOpacity={0.5}
				key={item.Message_ID}
				style={{
					backgroundColor: '#fff',
					elevation: 5,
					width: windowWidth * 0.94,
					marginBottom: 20,
				}}
			>
				{/* <ObjectCarouselSearch imgArray={item.Img} /> */}
				<View>
					<Image
						source={{ uri: `https://lexta.pro${item.Img[0]}` }}
						style={{ width: windowWidth * 0.94, height: windowWidth * 0.94 }}
						resizeMethod="scale"
					/>
				</View>
				<View style={{ paddingHorizontal: 10 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontFamily: fonts.bold,
								fontSize: 20,
								marginVertical: 10,
							}}
						>
							{numSplit(item.Price)} руб.
						</Text>
						{userFavorites && <Like like={userFavorites.filter((i) => i == item.Message_ID).length} objectId={item.Message_ID} />}
					</View>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: 15,
							lineHeight: 20,
							marginBottom: 20,
						}}
					>
						{item.Name}, {item.ObjectType}
						{'\n'}
						{item.TotalArea} м2,{'\n'}
						{item.Floor}/{item.FloorsInHouse} эт.
					</Text>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: 15,
							lineHeight: 20,
							marginBottom: 20,
						}}
					>
						{item.City}, {item.Region}
						{'\n'}
						{item.Street}, {item.HouseNumber}
					</Text>
				</View>
				<PhoneShow phoneNumber={item.Phone} cart />
			</TouchableOpacity>
		</View>
	)
}
