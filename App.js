import React from 'react'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { bootstrap } from './src/bootstrap'
import AppNavigator from './src/components/appNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import updateToken from './src/components/updateToken'
import { Provider } from 'react-redux'
import store from './src/store'

const App = () => {
	const [isReady, setIsReady] = React.useState(false)
	const [aStorage, setAStorage] = React.useState({})
	const [session, setSession] = React.useState(false)
	const { getItem } = useAsyncStorage('@storage_key')

	React.useEffect(() => {
		setInterval(() => {
			updateToken(aStorage)
		}, 10000)
	}, [])

	let content = session ? <AppNavigator page={'Main'} /> : <AppNavigator page={'Start'} />

	if (!isReady) {
		return (
			<React.Fragment>
				<AppLoading
					startAsync={bootstrap}
					onFinish={async () => {
						const item = await getItem()
						const itemToJson = JSON.parse(item)

						if (item) {
							await fetch(
								`https://lexta.pro/api/UpdateToken.php?user=${itemToJson.Email}&token=${itemToJson.Token}`,
								{
									method: 'POST',
									mode: 'no-cors',
									headers: new Headers(),
								}
							)
								.then((res) => res.json())
								.then((data) => {
									console.log('APPLOADING >>> ', data.Message)
									if (item && data.Message == 'update success') {
										console.log('woohoo')
										setSession(true)
										setAStorage(itemToJson)
										setIsReady(true)
									} else {
										console.log('fuck')
										setSession(false)
										setIsReady(true)
									}
								})
								.catch((e) => console.log(e))
						} else {
							console.log('nothing in storage')
							setSession(false)
							setIsReady(true)
						}
					}}
					onError={(err) => console.log(err)}
				/>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<StatusBar translucent backgroundColor="transparent" />
			<Provider store={store}>{content}</Provider>
		</React.Fragment>
	)
}

export default App

// let datas = data ? (
// 	data.map((item) => {
// 		return (
// 			<View key={item.Message_ID} style={{ paddingVertical: 10 }}>
// 				<Text>City: {item.City}</Text>
// 				<Text>HouseType: {item.HouseType}</Text>
// 				<Text>BalconyType: {item.BalconyType}</Text>
// 				<Text>Floor: {item.Floor}</Text>
// 			</View>
// 		)
// 	})
// ) : (
// 	<Text>Press "Get objects"</Text>
// )

// const Main = () => {
// 	return (
// 		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// 			<Button title="Get objects" onPress={() => getObj(false)} />
// 			<View style={{ flexDirection: 'column' }}>{datas}</View>
// 			<Button title="Clear" onPress={() => setData(false)} />
// 			<Button title="Exit" onPress={() => setToken(false)} />
// 		</View>
// 	)
// }

// const getObj = async () => {
// 	if (token) {
// 		await fetch(
// 			`https://lexta.kproject.su/api/GetObjects.php?token=${token}&user=admin@lexta.kproject.su`
// 		)
// 			.then((res) => res.json())
// 			.then((json) => setData(json))
// 	}
// }
