import ApiService from '../ApiService'


const API_ENDPOINTS = {
  CHATS: '/chats',
}

class AuthService extends ApiService {
  getAll = async () => this.apiClient.get(API_ENDPOINTS.CHATS)
}
export default new AuthService()
