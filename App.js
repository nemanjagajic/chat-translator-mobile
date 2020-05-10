import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import store from './store'
import { YellowBox } from 'react-native'
import socket from './socket'
import socketListeners from './socket/socketListeners'


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  )
}
