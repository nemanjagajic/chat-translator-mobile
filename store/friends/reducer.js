import {
  SET_FETCHING_FRIENDS,
  SET_FETCHING_FRIENDS_FINISHED,
  SET_FRIEND_REQUESTS,
  SET_FRIENDS,
  SET_RESPONDING_TO_FRIEND_REQUEST, SET_RESPONDING_TO_FRIEND_REQUEST_FINISHED,
} from './constants'

const initialState = {
  friends: [],
  isFetchingFriends: false,
  friendRequests: [],
  isRespondingToFriendRequest: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_FRIENDS: {
    return {
      ...state,
      friends: payload
    }
  }
  case SET_FETCHING_FRIENDS: {
    return {
      ...state,
      isFetchingFriends: true
    }
  }
  case SET_FETCHING_FRIENDS_FINISHED: {
    return {
      ...state,
      isFetchingFriends: false
    }
  }
  case SET_FRIEND_REQUESTS: {
    return {
      ...state,
      friendRequests: payload
    }
  }
  case SET_RESPONDING_TO_FRIEND_REQUEST: {
    return {
      ...state,
      isRespondingToFriendRequest: true
    }
  }
  case SET_RESPONDING_TO_FRIEND_REQUEST_FINISHED: {
    return {
      ...state,
      isRespondingToFriendRequest: false
    }
  }
  default:
    return state
  }
}
