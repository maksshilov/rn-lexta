import React, { useState, useEffect, memo } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import LextaService from '../services/LextaService'
import ObjectCard from '../components/ObjectCard'
import { useSelector } from 'react-redux'
import { ending } from '../components/scripts'
import { fonts } from '../styles/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import md5 from 'md5'

const lexta = new LextaService()

export default function SearchScreenResult({ route, navigation }) {
	let userFavorites = useSelector((state) => state.profile.Favorites)
	userFavorites = JSON.parse(userFavorites)

	const [loading, setLoading] = useState(false)
	const [dataSource, setDataSource] = useState([])
	const [curPos, setCurPos] = useState(0)
	const [isListEnd, setIsListEnd] = useState(false)

	const getData = async () => {
		const userData = await AsyncStorage.getItem('userData')
		const { Email, Token } = JSON.parse(userData)

		let params
		if (route.name === 'SearchCategoryResult') {
			params = `
			token=${Token}&
			user=${md5(Email)}&
			f_Category=${route.params[0][0]}
			recNum=5&
			curPos=${curPos}`
		} else {
			let {
				cityOrRegion,
				catalogType,
				f_Category,
				f_NumberRooms,
				objectType,
				priceFrom,
				priceTo,
				totalAreaFrom,
				totalAreaTo,
				kitchenAreaFrom,
				kitchenAreaTo,
				floorFrom,
				floorTo,
				whichFloor1,
				whichFloor2,
				whichFloor3,
				f_HouseType,
				mortgage,
				video,
			} = route.params.formState

			params = `
			token=${Token}&
			user=${md5(Email)}&
			cityOrRegion=${cityOrRegion}&
			catalogType=${catalogType}&
			f_Category=${f_Category}&
			f_NumberRooms=${f_NumberRooms}&
			objectType=${objectType}&
			priceFrom=${priceFrom}&
			priceTo=${priceTo}&
			totalAreaFrom=${totalAreaFrom}&
			totalAreaTo=${totalAreaTo}&
			kitchenAreaFrom=${kitchenAreaFrom}&
			kitchenAreaTo=${kitchenAreaTo}&
			floorFrom=${floorFrom}&
			floorTo=${floorTo}&
			whichFloor1=${whichFloor1}&
			whichFloor2=${whichFloor2}&
			whichFloor3=${whichFloor3}&
			f_HouseType=${f_HouseType}&
			mortgage=${mortgage}&
			video=${video}&
			recNum=5&
			curPos=${curPos}`
		}

		if (!loading && !isListEnd) {
			setLoading(true)
			lexta
				.getSearchObjects(params)
				.then((response) => response.json())
				.then((responseJson) => {
					if (responseJson.length > 0) {
						setCurPos(curPos + 5)
						setDataSource([...dataSource, ...responseJson])
						setLoading(false)
					} else {
						setIsListEnd(true)
						setLoading(false)
					}
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}

	const renderFooter = () => {
		return (
			<View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
				{loading ? <ActivityIndicator color="black" style={{ margin: 15 }} /> : null}
			</View>
		)
	}

	useEffect(() => {
		getData()
	}, [])

	// const renderItem = ({ item }) => <ObjectCard item={item} userFavorites={userFavorites} navigation={navigation} />
	const RenderItem = memo(function renderItem({ data }) {
		return <ObjectCard item={data} userFavorites={userFavorites} navigation={navigation} />
	})

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<View
				style={{
					alignItems: 'center',
					paddingTop: 20,
					backgroundColor: '#fff',
					paddingBottom: 50,
				}}
			>
				<Text
					style={{
						fontFamily: fonts.bold,
						fontSize: 15,
						marginVertical: 20,
						textAlign: 'center',
					}}
				>
					Нашлось {dataSource.length} объявлен{ending(dataSource.length)}
				</Text>
				<FlatList
					data={dataSource}
					renderItem={({ item }) => <RenderItem data={item} />}
					keyExtractor={(item) => item.Message_ID}
					ListFooterComponent={renderFooter}
					onEndReached={getData}
					onEndReachedThreshold={0.5}
				/>
			</View>
		</View>
	)
}
