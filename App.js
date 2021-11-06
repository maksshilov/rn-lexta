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
import md5 from 'md5'

const App = () => {
	const lexta = new LextaService()
	const [isReady, setIsReady] = React.useState(false)
	const [session, setSession] = React.useState(false)
	const { setItem, getItem } = useAsyncStorage('@storage_key')

	const writeItemToStorage = async (newValue) => {
		await setItem(newValue)
	}

	let content = <AppNavigator page={session ? 'Main' : 'Start'} />

	if (!isReady) {
		return (
			<React.Fragment>
				<AppLoading
					startAsync={bootstrap}
					onFinish={async () => {
						// Get info from storage
						const item = await getItem()
						const itemToJson = JSON.parse(item)
						// Check info from storage
						if (item) {
							// If it there is > update token
							const { Email, Token, UserId } = itemToJson
							lexta
								.updateToken(Email, Token, md5(UserId))
								.then((res) => res.json())
								.then((updToken) => {
									if (item && updToken.Message == 'update success') {
										// if update is success > rewrite info in storage
										lexta
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
											})
									} else {
										setSession(false)
										setIsReady(true)
									}
								})
								.catch((e) => console.log(e))
						} else {
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
