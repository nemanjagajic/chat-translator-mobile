import {
  SET_FETCHING_FRIENDS, SET_FETCHING_FRIENDS_FINISHED, SET_FRIENDS,
} from './constants'

const initialState = {
  friends: [],
  isFetchingFriends: false
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
    default:
      return state
  }
}
