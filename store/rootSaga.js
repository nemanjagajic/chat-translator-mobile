import { all } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import friendsSagas from './friends/sagas'
import chatsSagas from './chats/sagas'

export default function* rootSaga() {
  yield all([authSagas(), friendsSagas(), chatsSagas()])
}
