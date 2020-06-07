import {
  GET_FRIENDS, REMOVE_FRIEND, RESPOND_TO_FRIEND_REQUEST,
  SET_FETCHING_FRIENDS,
  SET_FETCHING_FRIENDS_FINISHED,
  SET_FRIEND_REQUESTS,
  SET_FRIENDS, SET_RESPONDING_TO_FRIEND_REQUEST, SET_RESPONDING_TO_FRIEND_REQUEST_FINISHED
} from './constants'

export const getFriends = () => ({
  type: GET_FRIENDS
})

export const setFriends = payload => ({
  type: SET_FRIENDS,
  payload
})

export const setFetchingFriends = () => ({
  type: SET_FETCHING_FRIENDS
})

export const setFetchingFriendsFinished = () => ({
  type: SET_FETCHING_FRIENDS_FINISHED
})

export const setFriendRequests = payload => ({
  type: SET_FRIEND_REQUESTS,
  payload
})

export const respondToFriendRequest = payload => ({
  type: RESPOND_TO_FRIEND_REQUEST,
  payload
})

export const setRespondingToFriendRequest = () => ({
  type: SET_RESPONDING_TO_FRIEND_REQUEST
})

export const setRespondingToFriendRequestFinished = () => ({
  type: SET_RESPONDING_TO_FRIEND_REQUEST_FINISHED
})

export const removeFriend = payload => ({
  type: REMOVE_FRIEND,
  payload
})
