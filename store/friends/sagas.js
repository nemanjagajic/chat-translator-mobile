import { Alert } from 'react-native'
import { all, takeLatest, put, call } from 'redux-saga/effects'
import { GET_FRIENDS, REMOVE_FRIEND, RESPOND_TO_FRIEND_REQUEST, SEARCH_USER, SEND_FRIEND_REQUEST } from './constants'
import {
  setFetchingFriends,
  setFetchingFriendsFinished, setFetchingSearchList, setFetchingSearchListFinished,
  setFriendRequests,
  setFriends,
  setRespondingToFriendRequest, setRespondingToFriendRequestFinished, setSearchList
} from './actions'
import friendsService from '../../services/api/FriendsService'
import { FRIENDS_PAGINATION_LIMIT } from '../../constants/Friends'
import $t from '../../i18n'

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
    const { userId, accept, label, navigation } = payload
    yield call(friendsService.respondToFriendRequest, { userId, accept })
    yield call(getFriends$)
    if (label && navigation) {
      navigation.navigate('FriendsScreen', { label })
      Alert.alert($t('Friends.success'), $t('Friends.successfullyAccepted'))
    }
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
    yield call(getFriends$)
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

export function* sendFriendRequest$({ payload }) {
  try {
    const { userId, navigation, label } = payload
    yield call(friendsService.sendFriendRequest, { userId })
    yield call(getFriends$)
    if (label && navigation) {
      navigation.navigate('FriendsScreen', { label })
    }
    Alert.alert('Success', 'Successfully sent friend request')
  } catch (e) {
    console.log(e)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_FRIENDS, getFriends$),
    takeLatest(RESPOND_TO_FRIEND_REQUEST, respondToFriendRequest$),
    takeLatest(REMOVE_FRIEND, removeFriend$),
    takeLatest(SEARCH_USER, searchUser$),
    takeLatest(SEND_FRIEND_REQUEST, sendFriendRequest$)
  ])
}
