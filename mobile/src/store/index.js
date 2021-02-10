import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { dukcapilReducer, detailReducer } from './reducers'

const rootReducer = combineReducers({ dukcapilReducer, detailReducer })

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;