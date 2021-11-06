import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import md5 from 'md5'
import store from '../store'
import LextaService from './LextaService'

const updateToken = async () => {
	const lexta = new LextaService()

	const { setItem, getItem } = useAsyncStorage('@storage_key')
	const writeItemToStorage = async (newValue) => {
		await setItem(newValue)
	}

	const item = await getItem()
	const itemToJson = JSON.parse(item)

	if (item) {
		// If item there is > update token
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
						})
				} else {
					console.log('try later...')
				}
			})
			.catch((e) => console.log(e))
	} else {
		setSession(false)
		setIsReady(true)
	}
}

export default updateToken
