import { all, takeLatest, put, call } from 'redux-saga/effects'
import { GET_FRIENDS } from './constants'
import {setFetchingFriends, setFetchingFriendsFinished, setFriendRequests, setFriends} from './actions'
import friendsService from '../../services/api/FriendsService'

export function* getFriends$() {
  yield put(setFetchingFriends())
  try {
    const { data: { friends, friendRequests } } = yield call(friendsService.getAll)
    yield put(setFriends(friends))
    yield put(setFriendRequests(friendRequests))
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
