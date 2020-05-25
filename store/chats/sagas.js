import { all, takeLatest, put, call, select } from 'redux-saga/effects'
import socket from '../../socket'
import {GET_CHATS, GET_MESSAGES, SEND_MESSAGE, SET_CHAT_SETTINGS_PROPERTY, SET_CHAT_VISITED} from './constants'
import {
  setFetchingChats,
  setFetchingChatsFinished,
  setChats,
  setFetchingMessages,
  setFetchingMessagesFinished,
  appendMessages,
  setSendingMessage,
  setSendingMessageFinished,
  appendMessageAndCropLimit, setMessagesOffset, setOpenedChat
} from './actions'
import chatsService from '../../services/api/ChatsService'
import { MESSAGES_PAGINATION_LIMIT } from '../../constants/Messages'

const getMessagesOffset = state => state.chats.messagesOffset
const getActiveUser = state => state.auth.user

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
    const offset = yield select(getMessagesOffset)
    const { data } = yield call(chatsService.getMessages, {
      chatId: payload.chatId,
      limit: MESSAGES_PAGINATION_LIMIT,
      offset
    })
    yield put(setMessagesOffset(offset + 1))
    yield put(appendMessages(data))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setFetchingMessagesFinished())
  }
}

export function* sendMessage$({ payload }) {
  const { chatId, text } = payload
  yield put(setSendingMessage())
  const me = yield select(getActiveUser)
  try {
    const pendingMessage = { ...payload }
    pendingMessage.pending = true
    pendingMessage._id = Math.random().toString(36).slice(2)
    pendingMessage.senderId = me._id
    yield put(appendMessageAndCropLimit({ paginationLimit: MESSAGES_PAGINATION_LIMIT, message: pendingMessage }))
    const { data } = yield call(chatsService.sendMessage, { chatId, text })
    socket.emit('chatMessageSent', data.message)
    yield put(appendMessageAndCropLimit({ paginationLimit: MESSAGES_PAGINATION_LIMIT, message: data.message }))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setSendingMessageFinished())
  }
}

export function* setChatSettingsProperty$({ payload }) {
  const { chatId, property, value } = payload
  try {
    const { data } = yield call(chatsService.setChatSettingsProperty, { chatId, property, value })
    socket.emit('chatSettingChanged', data)
    yield put(setOpenedChat(data))
  } catch (e) {
    console.log(e)
  }
}

export function* setChatVisited$({ payload }) {
  try {
    const { chatId } = payload
    yield call(chatsService.setChatVisited, { chatId })
  } catch (e) {
    console.log(e)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_CHATS, getChats$),
    takeLatest(GET_MESSAGES, getMessages$),
    takeLatest(SEND_MESSAGE, sendMessage$),
    takeLatest(SET_CHAT_SETTINGS_PROPERTY, setChatSettingsProperty$),
    takeLatest(SET_CHAT_VISITED, setChatVisited$)
  ])
}
