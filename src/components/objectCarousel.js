import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, Dimensions, View, Text, StyleSheet } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ObjectCarousel() {
	const images = Array.from({ length: 10 }).map((_, i) => {
		return {
			id: i,
			image: `https://picsum.photos/600/600?random=${Math.round(Math.random() * 1000)}`,
		}
	})

	const Slide = ({ data }) => {
		return (
			<View style={{ flex: 1 }}>
				<Image
					source={{ uri: data.image }}
					style={{ width: windowWidth, height: windowWidth / 1.2 }}
				/>
			</View>
		)
	}
	const [index, setIndex] = useState(0)
	const indexRef = useRef(index)
	indexRef.current = index

	const onScroll = useCallback((event) => {
		const slideSize = event.nativeEvent.layoutMeasurement.width
		const index = event.nativeEvent.contentOffset.x / slideSize
		const roundIndex = Math.round(index)
		const distance = Math.abs(roundIndex - index)
		const isNoMansLand = 0.4 < distance

		if (roundIndex !== indexRef.current && !isNoMansLand) {
			setIndex(roundIndex)
		}
	}, [])

	return (
		<>
			<FlatList
				onScroll={onScroll}
				showsHorizontalScrollIndicator={false}
				horizontal
				pagingEnabled
				data={images}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => {
					return <Slide data={item} />
				}}
			/>
			<Text style={{ marginTop: -30, fontFamily: 'gothampro-regular' }}>{index + 1}/10</Text>
		</>
	)
}
