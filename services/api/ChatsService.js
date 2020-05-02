import ApiService from '../ApiService'


const API_ENDPOINTS = {
  CHATS: '/chats',
  MESSAGES: '/messages'
}

class AuthService extends ApiService {
  getAll = async () => this.apiClient.get(API_ENDPOINTS.CHATS)

  getMessages = async ({ chatId, offset, limit }) =>
    this.apiClient.get(`${API_ENDPOINTS.MESSAGES}?chatId=${chatId}&offset=${offset}&limit=${limit}`)
}
export default new AuthService()
