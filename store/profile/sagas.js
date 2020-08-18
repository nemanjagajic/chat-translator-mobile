import { all, takeLatest, put, call } from 'redux-saga/effects'
import { UPDATE_USER_DATA } from './constants'
import profileService from '../../services/api/ProfileService'

export function* updateUserData$({ payload }) {
  try {
    const { data } = yield call(profileService.updateUser, payload)
  } catch (e) {
    console.log(e)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(UPDATE_USER_DATA, updateUserData$),
  ])
}
