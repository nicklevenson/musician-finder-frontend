import {combineReducers} from 'redux'
import userReducer from './userReducer.js'
import listReducer from './listReducer.js'
const rootReducer = combineReducers({currentUser: userReducer, lists: listReducer})
export default rootReducer