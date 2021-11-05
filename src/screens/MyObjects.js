import md5 from 'md5'
import React, { useEffect, useState } from 'react'
import {
	Dimensions,
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	RefreshControl,
	ActivityIndicator,
} from 'react-native'
import LextaService from '../services/LextaService'
import store from '../store'
import ObjectCard from '../components/ObjectCard'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MyObjects({ navigation }) {
	const [postsNum, setpostsNum] = useState(0)
	const [refreshing, setRefreshing] = useState(true)
	const [myObjects, setmyObjects] = useState([])

	const handleGetMyObjects = () => {
		const lexta = new LextaService()
		lexta
			.getMyObjects(
				store.getState().reducerUser.Token,
				md5(store.getState().reducerUser.Email)
			)
			.then((res) => res.json())
			.then((json) => {
				setRefreshing(false)
				setpostsNum(json.length)
				setmyObjects(json)
			})
			.catch((err) => console.error(err))
	}

	useEffect(() => {
		handleGetMyObjects()
	}, [])

	const onRefresh = () => {
		setmyObjects([])
		handleGetMyObjects()
	}

	const renderItem = ({ item }) => <ObjectCard item={item} navigation={navigation} />

	return (
		<View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
			{refreshing ? <ActivityIndicator /> : null}
			<View>
				<Text
					style={{
						fontFamily: 'gothampro-bold',
						fontSize: 15,
						marginVertical: 20,
						textAlign: 'center',
					}}
				>
					{postsNum} объявлений
				</Text>
			</View>
			<Pressable
				android_ripple
				onPress={() => {
					navigation.navigate('AddObject')
				}}
				style={{ ...styles.btn, ...styles.btnLogin }}
			>
				<Text style={{ ...styles.text, color: '#fff' }}>Добавить</Text>
			</Pressable>

			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					paddingTop: 10,
					backgroundColor: '#fff',
				}}
			>
				<FlatList
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					data={myObjects}
					renderItem={renderItem}
					keyExtractor={(item) => {
						return item.Message_ID
					}}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		fontFamily: 'gothampro-bold',
		fontSize: 20,
		marginBottom: 20,
	},
	inputView: {
		paddingLeft: 15,
		justifyContent: 'center',
		width: windowWidth * 0.8,
		height: windowWidth * 0.12,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#868686',
		marginBottom: 20,
	},
	inputText: {
		color: '#fdfffc',
		fontFamily: 'gothampro-regular',
		fontSize: 15,
		color: '#868686',
	},
	btn: {
		width: windowWidth * 0.8,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
	},
	btnLogin: {
		backgroundColor: '#912e33',
	},
	text: {
		fontFamily: 'gothampro-regular',
		fontSize: 18,
	},
})
