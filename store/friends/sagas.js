import { all, takeLatest, put, call } from 'redux-saga/effects'
import { GET_FRIENDS, REMOVE_FRIEND, RESPOND_TO_FRIEND_REQUEST } from './constants'
import {
  setFetchingFriends,
  setFetchingFriendsFinished,
  setFriendRequests,
  setFriends,
  setRespondingToFriendRequest, setRespondingToFriendRequestFinished
} from './actions'
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

export function* respondToFriendRequest$({ payload }) {
  yield put(setRespondingToFriendRequest())
  try {
    const { userId, accept } = payload
    yield call(friendsService.respondToFriendRequest, { userId, accept })
    yield call(getFriends$)
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setRespondingToFriendRequestFinished())
  }
}

export function* removeFriend$({ payload }) {
  try {
    console.log('removeFriend$')
    const { userId } = payload
    const response = yield call(friendsService.removeFriend, { userId })
    console.log({ response })
    yield call(getFriends$)
  } catch (e) {
    console.log(e)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_FRIENDS, getFriends$),
    takeLatest(RESPOND_TO_FRIEND_REQUEST, respondToFriendRequest$),
    takeLatest(REMOVE_FRIEND, removeFriend$)
  ])
}
