import { StatusBar } from 'expo-status-bar'
import React from 'react'
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap'
import AppNavigator from './src/components/appNavigator'
import LoginRegNavigator from './src/components/loginRegNavigator'
import { TokenProvider } from './src/components/tokenContext'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import { Provider } from 'react-redux'
import store from './src/store'

const App = () => {
	const [isReady, setIsReady] = React.useState(false)
	const [token, setToken] = React.useState(false)
	const [data, setData] = React.useState(false)

	const [session, setSession] = React.useState(false)
	const { getItem } = useAsyncStorage('@storage_key')

	console.log(session)

	const readItemFromStorage = async () => {
		const item = await getItem()
		if (item) setSession(true)
	}

	React.useEffect(() => {
		readItemFromStorage()
	}, [])

	if (!isReady) {
		return (
			<React.Fragment>
				<AppLoading
					startAsync={bootstrap}
					onFinish={() => setIsReady(true)}
					onError={(err) => console.log(err)}
				/>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<StatusBar translucent backgroundColor="transparent" />
			<Provider store={store}>
				{session ? <AppNavigator page={'Main'} /> : <AppNavigator page={'Start'} />}
			</Provider>
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
