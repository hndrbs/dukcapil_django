import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as allReducer from './reducers'

const rootReducer = combineReducers(allReducer)

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;