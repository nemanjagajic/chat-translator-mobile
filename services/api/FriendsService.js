import ApiService from '../ApiService'


const API_ENDPOINTS = {
  FRIENDS: '/friends',
}

class AuthService extends ApiService {
  getAll = async () => this.apiClient.get(API_ENDPOINTS.FRIENDS)
}
export default new AuthService()
