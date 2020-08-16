import { all, takeLatest, call, put } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_GOOGLE, LOG_OUT, REGISTER, REGISTER_NOTIFICATION_TOKEN, SET_ACTIVE_USER } from './constants'
import authService from '../../services/api/AuthService'
import { removeUser, setLoginFinished, setLoginInProgress, setUser } from './actions'
import * as GoogleSignIn from 'expo-google-sign-in'
import { SUCCESS } from '../../constants/Auth'
import { Alert } from 'react-native'

export function* logIn$({ payload }) {
  yield put(setLoginInProgress())
  try {
    const { email, password, navigateHome } = payload
    const { data } = yield call(authService.logIn, {
      email,
      password
    })
    yield call(setActiveUser$, {
      payload: {
        user: data,
        navigateHome
      }
    })
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setLoginFinished())
  }
}

export function* register$({ payload }) {
  const { email, firstName, lastName, password, navigateHome } = payload

  yield put(setLoginInProgress())
  try {
    yield call(authService.register, {
      email,
      firstName,
      lastName,
      password
    })
    yield call(logIn$, { payload: { email, password, navigateHome } })
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setLoginFinished())
  }
}

export function* setActiveUser$({ payload }) {
  yield call(authService.createSession, payload.user)
  yield put(setUser(payload.user))
  payload.navigateHome()
}

export function* logOut$({ payload }) {
  try {
    yield call(authService.destroySession)
    yield put(removeUser())
    payload.navigateAuth()
  } catch (e) {
    console.log(e)
  }
}

export function* registerNotificationToken$({ payload }) {
  try {
    const { token } = payload
    yield call(authService.registerNotificationToken, { token })
  } catch (e) {
    console.log(e)
  }
}

export function* logInGoogle$({ payload }) {
  try {
    const { navigateHome } = payload
    yield call(GoogleSignIn.askForPlayServicesAsync)
    const { type, user: { auth: { accessToken } } } = yield call(GoogleSignIn.signInAsync)
    if (type === SUCCESS) {
      const { data } = yield call(authService.logInGoogle, { accessToken })
      yield call(setActiveUser$, {
        payload: {
          user: data,
          navigateHome
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(LOG_IN, logIn$),
    takeLatest(LOG_OUT, logOut$),
    takeLatest(SET_ACTIVE_USER, setActiveUser$),
    takeLatest(REGISTER_NOTIFICATION_TOKEN, registerNotificationToken$),
    takeLatest(REGISTER, register$),
    takeLatest(LOG_IN_GOOGLE, logInGoogle$)
  ])
}
