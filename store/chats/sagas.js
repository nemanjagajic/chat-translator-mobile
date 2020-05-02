import { all, takeLatest, put, call } from 'redux-saga/effects'
import {GET_CHATS} from './constants'
import {setFetchingChats, setFetchingChatsFinished, setChats} from './actions'
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

export default function* sagas() {
  yield all([
    takeLatest(GET_CHATS, getChats$)
  ])
}
