import {
  GET_CHATS,
  SET_FETCHING_CHATS,
  SET_FETCHING_CHATS_FINISHED,
  SET_CHATS,
  GET_MESSAGES,
  APPEND_MESSAGES,
  SET_FETCHING_MESSAGES,
  SET_FETCHING_MESSAGES_FINISHED,
  CLEAR_MESSAGES,
  SET_OPENED_CHAT,
  CLEAR_OPENED_CHAT,
  SEND_MESSAGE,
  SET_SENDING_MESSAGE,
  SET_SENDING_MESSAGE_FINISHED,
  APPEND_MESSAGE_AND_CROP_LIMIT,
  SET_MESSAGES_OFFSET
} from './constants'

export const getChats = payload => ({
  type: GET_CHATS,
  payload
})

export const setChats = payload => ({
  type: SET_CHATS,
  payload
})

export const setFetchingChats = () => ({
  type: SET_FETCHING_CHATS
})

export const setFetchingChatsFinished = () => ({
  type: SET_FETCHING_CHATS_FINISHED
})

export const setOpenedChat = payload => ({
  type: SET_OPENED_CHAT,
  payload
})

export const clearOpenedChat = () => ({
  type: CLEAR_OPENED_CHAT
})

export const getMessages = payload => ({
  type: GET_MESSAGES,
  payload
})

export const appendMessages = payload => ({
  type: APPEND_MESSAGES,
  payload
})

export const clearMessages = () => ({
  type: CLEAR_MESSAGES
})

export const setFetchingMessages = () => ({
  type: SET_FETCHING_MESSAGES
})

export const setFetchingMessagesFinished = () => ({
  type: SET_FETCHING_MESSAGES_FINISHED
})

export const sendMessage = payload => ({
  type: SEND_MESSAGE,
  payload
})

export const setSendingMessage = () => ({
  type: SET_SENDING_MESSAGE
})

export const setSendingMessageFinished = () => ({
  type: SET_SENDING_MESSAGE_FINISHED
})

export const appendMessageAndCropLimit = payload => ({
  type: APPEND_MESSAGE_AND_CROP_LIMIT,
  payload
})

export const setMessagesOffset = payload => ({
  type: SET_MESSAGES_OFFSET,
  payload
})
