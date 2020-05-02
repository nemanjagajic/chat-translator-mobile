import {GET_CHATS, SET_FETCHING_CHATS, SET_FETCHING_CHATS_FINISHED, SET_CHATS} from './constants'

export const getChats = () => ({
  type: GET_CHATS
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
