import { all, takeLatest, put, call } from 'redux-saga/effects'
import {GET_CHATS, GET_MESSAGES, SEND_MESSAGE} from './constants'
import {
  setFetchingChats,
  setFetchingChatsFinished,
  setChats,
  setFetchingMessages,
  setFetchingMessagesFinished,
  appendMessages,
  setSendingMessage,
  setSendingMessageFinished,
  clearMessages,
  appendMessageAndCropLimit
} from './actions'
import chatsService from '../../services/api/ChatsService'

export function* getChats$({ payload }) {
  const { showLoadingIndicator } = payload

  if (showLoadingIndicator) yield put(setFetchingChats())
  try {
    const { data } = yield call(chatsService.getAll)
    yield put(setChats(data))
  } catch (e) {
    console.log(e)
  } finally {
    if (showLoadingIndicator) yield put(setFetchingChatsFinished())
  }
}

export function* getMessages$({ payload }) {
  yield put(setFetchingMessages())
  try {
    const { data } = yield call(chatsService.getMessages, payload)
    yield put(appendMessages(data))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setFetchingMessagesFinished())
  }
}

export function* sendMessage$({ payload }) {
  const { chatId, text, paginationLimit, resetPagination} = payload
  yield put(setSendingMessage())
  try {
    const { data } = yield call(chatsService.sendMessage, { chatId, text })
    yield put(appendMessageAndCropLimit({ paginationLimit, message: data.message }))
    resetPagination()
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setSendingMessageFinished())
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_CHATS, getChats$),
    takeLatest(GET_MESSAGES, getMessages$),
    takeLatest(SEND_MESSAGE, sendMessage$)
  ])
}
