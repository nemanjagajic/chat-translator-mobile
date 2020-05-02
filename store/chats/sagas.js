import { all, takeLatest, put, call } from 'redux-saga/effects'
import {GET_CHATS, GET_MESSAGES} from './constants'
import {
  setFetchingChats,
  setFetchingChatsFinished,
  setChats,
  setFetchingMessages,
  setFetchingMessagesFinished, appendMessages
} from './actions'
import chatsService from '../../services/api/ChatsService'

export function* getChats$() {
  yield put(setFetchingChats())
  try {
    const { data } = yield call(chatsService.getAll)
    yield put(setChats(data))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setFetchingChatsFinished())
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

export default function* sagas() {
  yield all([
    takeLatest(GET_CHATS, getChats$),
    takeLatest(GET_MESSAGES, getMessages$)
  ])
}
