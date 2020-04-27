import {
  REMOVE_USER,
  SET_LOGIN_FINISHED,
  SET_LOGIN_IN_PROGRESS,
  SET_USER
} from './authConstants'

const initialState = {
  user: null,
  loginInProgress: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        user: payload
      }
    }
    case REMOVE_USER: {
      return {
        ...state,
        user: null
      }
    }
    case SET_LOGIN_IN_PROGRESS:
      return {
        ...state,
        loginInProgress: true
      }
    case SET_LOGIN_FINISHED:
      return {
        ...state,
        loginInProgress: false
      }
    default:
      return state
  }
}
