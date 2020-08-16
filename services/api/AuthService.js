import ApiService from '../ApiService'
import { AsyncStorage } from 'react-native'
import socket from '../../socket'

const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REGISTER_NOTIFICATION_TOKEN: '/auth/registerNotificationToken',
  LOGIN_GOOGLE: '/auth/loginWithGoogle'
}

class AuthService extends ApiService {
  createSession = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
    await this.setAuthorizationHeader(user.token)
    socket.emit('createUserSession', {
      userId: user._id,
      socketId: socket.id
    })
  }

  setAuthorizationHeader = token => {
    this.api.attachHeaders({
      Authorization: token
    })
  }

  destroySession = async () => {
    await AsyncStorage.clear()
    this.api.removeHeaders(['Authorization'])
  }

  logIn = ({ email, password }) => this.apiClient.post(API_ENDPOINTS.LOGIN, { email, password })

  register = data => this.apiClient.post(API_ENDPOINTS.REGISTER, data)

  logInGoogle = async data => this.apiClient.post(API_ENDPOINTS.LOGIN_GOOGLE, data)

  registerNotificationToken = ({ token }) => this.apiClient.post(API_ENDPOINTS.REGISTER_NOTIFICATION_TOKEN, { token })
}
export default new AuthService()
