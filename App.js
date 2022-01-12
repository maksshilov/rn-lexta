import React from 'react'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import AppNavigator from './src/navigators/AppNavigator'
import { bootstrap } from './src/bootstrap'
import authReducer from './src/store/reducers/auth'
import profileReducer from './src/store/reducers/profile'
import coordsReducer from './src/store/reducers/coords'
import { reducerUser, reducerObjects } from './src/store/reducer'

const App = () => {
	const [isReady, setIsReady] = React.useState(false)

	const rootReducer = combineReducers({
		auth: authReducer,
		profile: profileReducer,
		coords: coordsReducer,
		reducerUser,
		reducerObjects,
	})

	const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

	if (!isReady) {
		return (
			<React.Fragment>
				<AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)} />
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<StatusBar translucent backgroundColor="transparent" />
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		</React.Fragment>
	)
}

export default App
