import {
  SET_FETCHING_CHATS,
  SET_FETCHING_CHATS_FINISHED,
  SET_CHATS,
  SET_OPENED_CHAT,
  CLEAR_OPENED_CHAT,
  SET_FETCHING_MESSAGES,
  SET_FETCHING_MESSAGES_FINISHED, APPEND_MESSAGES, CLEAR_MESSAGES,
} from './constants'

const initialState = {
  chats: [],
  isFetchingChats: false,
  messages: [],
  isFetchingMessages: false,
  openedChat: null
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
    case SET_OPENED_CHAT: {
      return {
        ...state,
        openedChat: payload
      }
    }
    case CLEAR_OPENED_CHAT: {
      return {
        ...state,
        openedChat: null
      }
    }
    case SET_FETCHING_MESSAGES: {
      return {
        ...state,
        isFetchingMessages: true
      }
    }
    case SET_FETCHING_MESSAGES_FINISHED: {
      return {
        ...state,
        isFetchingMessages: false
      }
    }
    case APPEND_MESSAGES: {
      return {
        ...state,
        messages: state.messages.concat(payload)
      }
    }
    case CLEAR_MESSAGES: {
      return {
        ...state,
        messages: []
      }
    }
    default:
      return state
  }
}
