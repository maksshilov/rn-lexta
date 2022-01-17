import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import LextaService from '../services/LextaService'
import { colors, fonts } from '../styles/constants'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function NewsScreen() {
	const lexta = new LextaService()
	const [dataSource, setDataSource] = useState([])
	const [unfold, setUnfold] = useState()

	const handleGetNews = async () => {
		lexta
			.getNews()
			.then((res) => res.json())
			.then((json) => setDataSource(json.data))
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		handleGetNews()
	}, [])

	// const handleNewsText = (text) => {
	// 	if (text.length > 200) {
	// 		let preview = text.substr(0, 200) + '...' + ' далее'
	// 		return preview
	// 	} else {
	// 		return text
	// 	}
	// }

	const renderItem = ({ item }) => {
		if (item) {
			return (
				<View style={{ marginVertical: 10, width: windowWidth * 0.94 }}>
					<TouchableOpacity onPress={() => setUnfold(item.Message_ID)}>
						<Text style={{ fontFamily: fonts.bold, fontSize: 20, color: '#000' }}>{item.Name}</Text>
					</TouchableOpacity>
					<Text style={{ fontFamily: fonts.regular, fontSize: 12, color: '#000', marginVertical: 5 }}>{item.Created}</Text>
					<Text style={{ fontFamily: fonts.regular, lineHeight: 20 }}>{item.Message_ID == unfold ? item.Text : null}</Text>
				</View>
			)
		}
	}

	return (
		<View
			style={{
				alignItems: 'center',
				paddingTop: 50,
				backgroundColor: '#fff',
				paddingBottom: 50,
			}}
		>
			<FlatList
				data={dataSource}
				renderItem={renderItem}
				keyExtractor={(item) => item.Message_ID}
				// ListFooterComponent={renderFooter}
				// onEndReached={getData}
				// onEndReachedThreshold={0.5}
			/>
		</View>
	)
}
