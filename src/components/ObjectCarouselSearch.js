import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, Dimensions, View, Text, StyleSheet } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const images = Array.from({ length: 3 }).map((_, i) => {
	return {
		id: i,
		image: `https://picsum.photos/600/600?random=${Math.round(Math.random() * 1000)}`,
	}
})

export default function ObjectCarouselSearch() {
	const Slide = ({ data }) => {
		return (
			<View style={{ backgroundColor: 'silver' }}>
				<Image
					source={{ uri: data.image }}
					style={{ width: windowWidth * 0.88, height: windowWidth * 0.88 }}
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

	const flatListOptimizationProps = {
		initialNumToRender: 0,
		maxToRenderPerBatch: 1,
		removeClippedSubviews: true,
		scrollEventThrottle: 16,
		windowSize: 3,
		keyExtractor: useCallback((e) => e.id, []),
		getItemLayout: useCallback(
			(_, index) => ({
				index,
				length: windowWidth,
				offset: index * windowWidth,
			}),
			[]
		),
	}

	return (
		<>
			<View style={{ width: windowWidth * 0.88 }}>
				<FlatList
					{...flatListOptimizationProps}
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
				<Text
					style={{
						fontFamily: 'gothampro-regular',
						// textAlign: 'center',
						color: '#000',
						fontSize: 10,
						marginTop: -20,
						marginLeft: 10,
						marginBottom: 10,
					}}
				>
					{index + 1}/3
				</Text>
			</View>
		</>
	)
}
