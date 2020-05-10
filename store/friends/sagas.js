import { all, takeLatest, put, call } from 'redux-saga/effects'
import { GET_FRIENDS } from './constants'
import { setFetchingFriends, setFetchingFriendsFinished, setFriends } from './actions'
import friendsService from '../../services/api/FriendsService'

export function* getFriends$() {
  yield put(setFetchingFriends())
  try {
    const { data } = yield call(friendsService.getAll)
    yield put(setFriends(data))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setFetchingFriendsFinished())
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_FRIENDS, getFriends$)
  ])
}
