import socket from './index'
import store from '../store'
import {appendMessageAndCropLimit, getChats} from '../store/chats/actions'
import {MESSAGES_PAGINATION_LIMIT} from '../constants/Messages'

socket.on('loadMessage', message => {
  const state = store.getState()
  const openedChat = state.chats.openedChat
  if (!openedChat) {
    store.dispatch(getChats({ showLoadingIndicator: false }))
    return
  }
  if (openedChat._id === message.chatId) {
    store.dispatch(appendMessageAndCropLimit({paginationLimit: MESSAGES_PAGINATION_LIMIT, message}))
  }
})

export default {}
