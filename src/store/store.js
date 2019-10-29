import {createStore, combineReducers, applyMiddleware} from 'redux'
import * as forum from './forum/reducer'
import thunk from 'redux-thunk'

let store = createStore(
    combineReducers({...forum}),
    applyMiddleware(thunk)
)

export default store;