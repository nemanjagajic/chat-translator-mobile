import socket from './index'
import store from '../store'
import {appendMessageAndCropLimit} from '../store/chats/actions'
import {MESSAGES_PAGINATION_LIMIT} from '../constants/Messages'

socket.on('loadMessage', message => {
  store.dispatch(appendMessageAndCropLimit({ paginationLimit: MESSAGES_PAGINATION_LIMIT, message }))
})

export default {}
