import {
  LOG_IN,
  LOG_IN_GOOGLE,
  LOG_OUT, REGISTER, REGISTER_NOTIFICATION_TOKEN,
  REMOVE_USER,
  SET_ACTIVE_USER,
  SET_LOGIN_FINISHED,
  SET_LOGIN_IN_PROGRESS,
  SET_USER,
} from './constants'

export const logIn = payload => ({
  type: LOG_IN,
  payload
})

export const setLoginInProgress = () => ({
  type: SET_LOGIN_IN_PROGRESS
})

export const setLoginFinished = () => ({
  type: SET_LOGIN_FINISHED
})

export const logOut = payload => ({
  type: LOG_OUT,
  payload
})

export const setActiveUser = payload => ({
  type: SET_ACTIVE_USER,
  payload
})

export const setUser = payload => ({
  type: SET_USER,
  payload
})

export const removeUser = () => ({
  type: REMOVE_USER
})

export const registerNotificationToken = payload => ({
  type: REGISTER_NOTIFICATION_TOKEN,
  payload
})

export const register = payload => ({
  type: REGISTER,
  payload
})

export const logInGoogle = payload => ({
  type: LOG_IN_GOOGLE,
  payload
})
