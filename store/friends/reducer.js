import {
  SET_FETCHING_FRIENDS,
  SET_FETCHING_FRIENDS_FINISHED, SET_FETCHING_SEARCH_LIST, SET_FETCHING_SEARCH_LIST_FINISHED,
  SET_FRIEND_REQUESTS,
  SET_FRIENDS,
  SET_RESPONDING_TO_FRIEND_REQUEST, SET_RESPONDING_TO_FRIEND_REQUEST_FINISHED, SET_SEARCH_LIST,
} from './constants'

const initialState = {
  friends: [],
  isFetchingFriends: false,
  friendRequests: [],
  isRespondingToFriendRequest: false,
  isFetchingSearchList: false,
  searchList: []
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
  case SET_FETCHING_SEARCH_LIST: {
    return {
      ...state,
      isFetchingSearchList: true
    }
  }
  case SET_FETCHING_SEARCH_LIST_FINISHED: {
    return {
      ...state,
      isFetchingSearchList: false
    }
  }
  case SET_SEARCH_LIST: {
    return {
      ...state,
      searchList: payload
    }
  }
  default:
    return state
  }
}
