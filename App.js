import React from 'react'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { bootstrap } from './src/bootstrap'
import AppNavigator from './src/components/AppNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import updateToken from './src/services/updateToken'
import { Provider } from 'react-redux'
import store from './src/store'
import LextaService from './src/services/LextaService'

const App = () => {
	const [isReady, setIsReady] = React.useState(false)
	const [session, setSession] = React.useState(false)
	const { setItem, getItem } = useAsyncStorage('@storage_key')

	const writeItemToStorage = async (newValue) => {
		await setItem(newValue)
	}

	React.useEffect(() => {
		setInterval(() => {
			let { Email, Token, UserId } = store.getState().reducerUser
			updateToken({ Email, Token, UserId })
		}, 60000)
	}, [])

	let content = <AppNavigator page={session ? 'Main' : 'Start'} />

	if (!isReady) {
		return (
			<React.Fragment>
				<AppLoading
					startAsync={bootstrap}
					onFinish={async () => {
						const item = await getItem()
						const itemToJson = JSON.parse(item)
						if (item) {
							const { Email, Token, UserId } = itemToJson
							const data = new FormData()
							data.append('user', Email)
							data.append('token', Token)
							data.append('userId', UserId)

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
											.getUserInfo(updToken.Token, Email)
											.then((res) => res.json())
											.then((userInfo) => {
												const storage = JSON.stringify({
													...userInfo[0],
													Token: updToken.Token,
													UserId: UserId,
												})
												writeItemToStorage(storage)
												store.dispatch({
													type: 'UPD_TOKEN',
													payload: updToken.Token,
												})
												setSession(true)
												setIsReady(true)
												// console.log('woohoo')
											})
									} else {
										setSession(false)
										setIsReady(true)
										// console.log('fuck')
									}
								})
								.catch((e) => console.log(e))
						} else {
							// console.log('nothing in storage')
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
