import React from 'react'
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const dummyData = [
	{
		id: 1,
		image: `https://picsum.photos/1440/2842?random=${Math.round(Math.random() * 1000)}`,
		title: `Комнаты`,
	},
	{
		id: 2,
		image: `https://picsum.photos/1440/2842?random=${Math.round(Math.random() * 1000)}`,
		title: `Квартиры`,
	},
	{
		id: 3,
		image: `https://picsum.photos/1440/2842?random=${Math.round(Math.random() * 1000)}`,
		title: `Таунхаусы`,
	},
	{
		id: 4,
		image: `https://picsum.photos/1440/2842?random=${Math.round(Math.random() * 1000)}`,
		title: `Дома`,
	},
]

const Slide = React.memo(function Slide({ data }) {
	return (
		<View style={styles.slide}>
			<TouchableOpacity>
				<View style={{ ...styles.slideImage, elevation: 5 }}>
					<Image source={{ uri: data.image }} style={styles.slideImage}></Image>
				</View>
			</TouchableOpacity>
			<Text style={styles.slideTitle}>{data.title}</Text>
		</View>
	)
})

export default function Carousel() {
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
		backgroundColor: '#000',
		width: windowWidth * 0.4,
		height: windowWidth * 0.4 * 1.25,
		borderRadius: 7,
		marginRight: 10,
		marginBottom: 10,
	},
	slideTitle: { fontFamily: 'gothampro-regular', fontSize: 12 },
})
