import React from 'react'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { bootstrap } from './src/bootstrap'
import AppNavigator from './src/components/AppNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import updateToken from './src/components/updateToken'
import { Provider } from 'react-redux'
import store from './src/store'
import LextaService from './src/services/LextaService'

const App = () => {
	const [isReady, setIsReady] = React.useState(false)
	const [aStorage, setAStorage] = React.useState({})
	const [session, setSession] = React.useState(false)
	const { setItem, getItem } = useAsyncStorage('@storage_key')

	const writeItemToStorage = async (newValue) => {
		await setItem(newValue)
	}
	// console.log('aStorage', aStorage)
	React.useEffect(() => {
		setInterval(() => {
			updateToken(aStorage)
		}, 60000)
	}, [aStorage])

	let content = <AppNavigator page={session ? 'Main' : 'Start'} />

	if (!isReady) {
		return (
			<React.Fragment>
				<AppLoading
					startAsync={bootstrap}
					onFinish={async () => {
						const item = await getItem()
						const itemToJson = JSON.parse(item)
						console.log('OLD TOKEN', itemToJson)
						if (item) {
							const data = new FormData()
							data.append('user', itemToJson.Email)
							data.append('token', itemToJson.Token)
							data.append('userId', itemToJson.UserId)

							await fetch(`https://lexta.pro/api/UpdateToken.php`, {
								method: 'POST',
								mode: 'no-cors',
								headers: new Headers(),
								body: data,
							})
								.then((res) => res.json())
								.then((updToken) => {
									if (item && updToken.Message == 'update success') {
										lextaService = new LextaService()
										lextaService
											.getUserInfo(updToken.Token, itemToJson.Email)
											.then((res) => {
												return res.json()
											})
											.then((userInfo) => {
												console.log('userInfo', userInfo)
												const storage = JSON.stringify({
													...userInfo[0],
													Token: updToken.Token,
													UserId: itemToJson.UserId,
												})

												writeItemToStorage(storage)
												setSession(true)
												setAStorage({ ...itemToJson, Token: data.Token })
												setIsReady(true)
												console.log('woohoo')
											})
									} else {
										setSession(false)
										setIsReady(true)
										console.log('fuck')
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
