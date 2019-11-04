import {createStore, combineReducers, applyMiddleware} from 'redux'
import * as forum from './forum/reducer'
import * as products from './products/reducer'
import thunk from 'redux-thunk'

let store = createStore(
    combineReducers({...forum},{...products}),
    applyMiddleware(thunk)
)

export default store;