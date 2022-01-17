import AsyncStorage from '@react-native-async-storage/async-storage'
import md5 from 'md5'
import React from 'react'
import { Text, View, Dimensions, Image, StyleSheet, Pressable } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import LextaService from '../services/LextaService'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const dummyData = [
	{
		id: 1,
		image: `https://lexta.pro/netcat_files/32/9/h_dfe3343fb0912327c9e34b62407264a4`,
		title: `Комнаты`,
		category: '1',
	},
	{
		id: 2,
		image: `https://lexta.pro/netcat_files/32/9/h_7de2cdb9b916a6434952efcaf38e470d`,
		title: `Квартиры`,
		category: '2',
	},
	{
		id: 3,
		image: `https://lexta.pro/netcat_files/32/9/h_d9ab87dd91671d0c0ae68ba432e5bfe8`,
		title: `Дома`,
		category: '4',
	},
	{
		id: 4,
		image: `https://lexta.pro/netcat_files/32/9/h_825857abfee3eee4c7cd50f698a4fe52`,
		title: `Коттеджи`,
		category: '5',
	},
	{
		id: 5,
		image: `https://lexta.pro/netcat_files/32/9/h_442dca00ce75a26f5269fa4e49948fa6`,
		title: `Таунхаусы`,
		category: '6',
	},
	{
		id: 6,
		image: `https://lexta.pro/netcat_files/32/9/h_3897d52d4ed137668ece6fc1e961375c`,
		title: `Дачи`,
		category: '3',
	},
]

export default function Carousel({ navigation }) {
	const Slide = ({ data }) => {
		return (
			<View style={styles.slide}>
				<Pressable
					android_ripple={{ color: '#fff' }}
					style={{ ...styles.slideImage, elevation: 5 }}
					onPress={() => {
						// handleChooseCategory(data.category)
						navigation.navigate('Elements', { screen: 'SearchCategoryResult', params: data.category })
					}}
				>
					{/* <View style={{ ...styles.slideImage, elevation: 5 }}> */}
					<Image source={{ uri: data.image }} style={styles.slideImage}></Image>
					{/* </View> */}
				</Pressable>
				<Text style={styles.slideTitle}>{data.title}</Text>
			</View>
		)
	}

	return (
		<React.Fragment>
			<FlatList
				data={dummyData}
				style={styles.flatlist}
				renderItem={({ item }) => {
					return <Slide data={item} />
				}}
				pagingEnabled={false}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => String(item.id)}
				contentContainerStyle={{ paddingLeft: 10 }}
			/>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	slide: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	slideImage: {
		width: windowWidth * 0.4,
		height: windowWidth * 0.4 * 1.25,
		borderRadius: 7,
		marginRight: 10,
		marginBottom: 10,
	},
	slideTitle: { fontFamily: 'gothampro-regular', fontSize: 12 },
})
