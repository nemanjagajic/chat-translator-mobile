import { SET_UPDATING_USER_DATA, SET_UPDATING_USER_DATA_FINISHED, UPDATE_USER_DATA } from './constants'

export const updateUserData = payload => ({
  type: UPDATE_USER_DATA,
  payload
})

export const setUpdatingUserData = () => ({
  type: SET_UPDATING_USER_DATA
})

export const setUpdatingUserDataFinished = () => ({
  type: SET_UPDATING_USER_DATA_FINISHED
})
