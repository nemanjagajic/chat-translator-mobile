import {
  SET_FETCHING_CHATS,
  SET_FETCHING_CHATS_FINISHED,
  SET_CHATS,
  SET_OPENED_CHAT,
  CLEAR_OPENED_CHAT,
  SET_FETCHING_MESSAGES,
  SET_FETCHING_MESSAGES_FINISHED,
  APPEND_MESSAGES,
  CLEAR_MESSAGES,
  SET_SENDING_MESSAGE,
  SET_SENDING_MESSAGE_FINISHED,
  APPEND_MESSAGE_AND_CROP_LIMIT, SET_MESSAGES_OFFSET, SET_FRIEND_TYPING, REMOVE_FRIEND_TYPING,
} from './constants'
import languages from '../../utils/languages'

const initialState = {
  chats: [],
  isFetchingChats: false,
  messages: [],
  isFetchingMessages: false,
  openedChat: null,
  isSendingMessage: false,
  messagesOffset: 0,
  languages,
  friendsTyping: []
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
  case SET_SENDING_MESSAGE: {
    return {
      ...state,
      isSendingMessage: true
    }
  }
  case SET_SENDING_MESSAGE_FINISHED: {
    return {
      ...state,
      isSendingMessage: false
    }
  }
  case APPEND_MESSAGE_AND_CROP_LIMIT: {
    const { message, paginationLimit } = payload
    const sentMessages = state.messages.filter(m => !m.pending)
    const cropped = sentMessages.slice(0, paginationLimit - 1)
    const croppedMessages = [message].concat(cropped)
    return {
      ...state,
      messages: croppedMessages,
      messagesOffset: 1
    }
  }
  case SET_MESSAGES_OFFSET: {
    return {
      ...state,
      messagesOffset: payload
    }
  }
  case SET_FRIEND_TYPING: {
    const updatedFriendsTyping = state.friendsTyping.concat(payload)
    return {
      ...state,
      friendsTyping: updatedFriendsTyping
    }
  }
  case REMOVE_FRIEND_TYPING: {
    const updatedFriendsTyping = state.friendsTyping.filter(item => item !== payload)
    return {
      ...state,
      friendsTyping: updatedFriendsTyping
    }
  }
  default:
    return state
  }
}
