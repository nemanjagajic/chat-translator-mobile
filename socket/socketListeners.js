import socket from './index'
import store from '../store'
import {
  appendMessageAndCropLimit,
  getChats, getMessages,
  removeFriendTyping, setChatVisited,
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
    store.dispatch(setChatVisited({ chatId: message.chatId }))
  }
})

socket.on('loadChatSettings', data => {
  const state = store.getState()
  const openedChat = state.chats.openedChat
  if (openedChat && (openedChat._id === data.chatId)) {
    const updatedOpenedChat = openedChat
    updatedOpenedChat.friend = data.friend
    if (data.sendLanguage && !data.receiveLanguage) {
      updatedOpenedChat.receiveLanguage = data.sendLanguage
    }
    if (data.receiveLanguage && !data.sendLanguage) {
      updatedOpenedChat.sendLanguage = data.receiveLanguage
    }
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

socket.on('updateFriendVisitData', data => {
  const state = store.getState()
  const openedChat = state.chats.openedChat
  if (!openedChat) {
    store.dispatch(getChats({ showLoadingIndicator: false }))
    return
  }
  if (openedChat._id === data.chatId) {
    const updatedOpenedChat = { ...openedChat }
    updatedOpenedChat.friend.lastVisit = data.newLastVisit
    store.dispatch(setOpenedChat(updatedOpenedChat))
  }
})

export default {}
