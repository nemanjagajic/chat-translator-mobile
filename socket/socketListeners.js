import socket from './index'
import store from '../store'
import {
  appendMessageAndCropLimit,
  getChats,
  removeFriendTyping,
  setFriendTyping,
  setOpenedChat
} from '../store/chats/actions'
import { MESSAGES_PAGINATION_LIMIT } from '../constants/Messages'
import { AsyncStorage } from 'react-native'

socket.on('loadMessage', message => {
  const user = AsyncStorage.getItem('user')
  if (!user) return

  const state = store.getState()
  const openedChat = state.chats.openedChat
  if (!openedChat) {
    store.dispatch(getChats({ showLoadingIndicator: false }))
    return
  }
  if (openedChat._id === message.chatId) {
    store.dispatch(appendMessageAndCropLimit({ paginationLimit: MESSAGES_PAGINATION_LIMIT, message }))
  }
})

socket.on('loadChatSettings', data => {
  const state = store.getState()
  const openedChat = state.chats.openedChat
  if (openedChat && (openedChat._id === data.chatId)) {
    const updatedOpenedChat = openedChat
    updatedOpenedChat.friend = data.friend
    store.dispatch(setOpenedChat(updatedOpenedChat))
  } else {
    store.dispatch(getChats({ showLoadingIndicator: false }))
  }
})

socket.on('friendStartedTyping', data => {
  store.dispatch(setFriendTyping(data.chatId))
})

socket.on('friendStoppedTyping', data => {
  store.dispatch(removeFriendTyping(data.chatId))

})

export default {}
