import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer, detailReducer } from './reducers'

const rootReducer = combineReducers({ reducer, detailReducer })

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;