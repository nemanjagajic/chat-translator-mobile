import {
  SET_FETCHING_CHATS, SET_FETCHING_CHATS_FINISHED, SET_CHATS,
} from './constants'

const initialState = {
  chats: [],
  isFetchingChats: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CHATS: {
      return {
        ...state,
        chats: payload
      }
    }
    case SET_FETCHING_CHATS: {
      return {
        ...state,
        isFetchingChats: true
      }
    }
    case SET_FETCHING_CHATS_FINISHED: {
      return {
        ...state,
        isFetchingChats: false
      }
    }
    default:
      return state
  }
}
