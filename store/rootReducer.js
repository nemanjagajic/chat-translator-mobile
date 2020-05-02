import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import friendsReducer from './friends/reducer'
import chatsReducer from './chats/reducer'

export default combineReducers({
  auth: authReducer,
  friends: friendsReducer,
  chats: chatsReducer
})
