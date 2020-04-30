import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import friendsReducer from './friends/reducer'

export default combineReducers({
  auth: authReducer,
  friends: friendsReducer
})
