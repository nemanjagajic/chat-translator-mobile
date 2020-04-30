import {GET_FRIENDS, SET_FETCHING_FRIENDS, SET_FETCHING_FRIENDS_FINISHED, SET_FRIENDS} from './constants'

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
