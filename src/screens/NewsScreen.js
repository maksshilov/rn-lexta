import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import LextaService from '../services/LextaService'

export default function NewsScreen() {
	let lexta = new LextaService()

	const handleGetNews = async () => {
		lexta
			.getNews()
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		handleGetNews()
	}, [])

	return (
		<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
			<View>
				<Text>NEWs</Text>
			</View>
		</ScrollView>
	)
}
