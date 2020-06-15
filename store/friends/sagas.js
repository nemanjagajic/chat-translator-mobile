import { all, takeLatest, put, call } from 'redux-saga/effects'
import { GET_FRIENDS, REMOVE_FRIEND, RESPOND_TO_FRIEND_REQUEST, SEARCH_USER } from './constants'
import {
  setFetchingFriends,
  setFetchingFriendsFinished, setFetchingSearchList, setFetchingSearchListFinished,
  setFriendRequests,
  setFriends,
  setRespondingToFriendRequest, setRespondingToFriendRequestFinished, setSearchList
} from './actions'
import friendsService from '../../services/api/FriendsService'
import { FRIENDS_PAGINATION_LIMIT } from '../../constants/Friends'

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
    const { userId } = payload
    yield call(friendsService.removeFriend, { userId })
    yield call(getFriends$)
  } catch (e) {
    console.log(e)
  }
}

export function* searchUser$({ payload }) {
  yield put(setFetchingSearchList())
  try {
    const { text, offset } = payload
    const { data } = yield call(friendsService.searchUser, {
      text,
      offset,
      limit: FRIENDS_PAGINATION_LIMIT
    })
    yield put(setSearchList(data))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setFetchingSearchListFinished())
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_FRIENDS, getFriends$),
    takeLatest(RESPOND_TO_FRIEND_REQUEST, respondToFriendRequest$),
    takeLatest(REMOVE_FRIEND, removeFriend$),
    takeLatest(SEARCH_USER, searchUser$)
  ])
}
