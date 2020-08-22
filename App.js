import React, { useEffect } from 'react'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import store from './store'
import { YellowBox, Platform } from 'react-native'
import socket from './socket'
import socketListeners from './socket/socketListeners'
import * as GoogleSignIn from 'expo-google-sign-in'
import * as ExpoNotifications from 'expo-notifications'
import { Notifications } from 'expo'


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'Animated: `useNativeDriver` was not specified.',
  'Animated.event now requires a second argument for options',
  'Possible Unhandled Promise Rejection (id:'
])

export default function App() {
  useEffect(() => {
    GoogleSignIn.initAsync()
    if (Platform.OS === 'android') {
      Notifications.dismissAllNotificationsAsync()
    } else {
      ExpoNotifications.dismissAllNotificationsAsync()
    }
  }, [])

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  )
}
