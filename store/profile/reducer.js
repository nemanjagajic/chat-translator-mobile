import { SET_UPDATING_USER_DATA, SET_UPDATING_USER_DATA_FINISHED } from './constants'

const initialState = {
  isUpdatingUserData: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_UPDATING_USER_DATA: {
    return {
      ...state,
      isUpdatingUserData: true
    }
  }
  case SET_UPDATING_USER_DATA_FINISHED: {
    return {
      ...state,
      isUpdatingUserData: false
    }
  }
  default:
    return state
  }
}
