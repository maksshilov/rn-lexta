import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import md5 from 'md5'
import store from '../store'

const updateToken = async ({ Email, Token, UserId }) => {
	const { setItem, getItem } = useAsyncStorage('@storage_key')

	const data = new FormData()
	data.append('user', Email)
	data.append('token', Token)
	data.append('userId', md5(UserId))

	await fetch(`https://lexta.pro/api/UpdateToken.php`, {
		method: 'POST',
		mode: 'no-cors',
		headers: new Headers(),
		body: data,
	})
		.then((res) => res.json())
		.then(async (json) => {
			return json
		})
		.then(async (json) => {
			const item = await getItem()
			const itemToJson = JSON.parse(item)

			const newToken = json.Token ? json.Token : itemToJson.Token
			const storage = JSON.stringify({
				...itemToJson,
				Token: newToken,
			})
			store.dispatch({
				type: 'UPD_TOKEN',
				payload: newToken,
			})
			return storage
		})
		.then(async (storage) => {
			await setItem(storage)
		})

		.catch((e) => console.log(e))
}

export default updateToken
