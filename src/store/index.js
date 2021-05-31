import { reducerUser, reducerObjects } from './reducer'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
	reducerUser,
	reducerObjects,
})

const store = createStore(rootReducer)
export default store
