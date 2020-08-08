import ApiService from '../ApiService'


const API_ENDPOINTS = {
  FRIENDS: '/friends',
  RESPOND_TO_FRIEND_REQUEST: 'friends/respondToFriendRequest',
  REMOVE_FRIEND: 'friends/remove',
  SEARCH_USER: 'friends/searchUser',
  SEND_FRIEND_REQUEST: 'friends/sendFriendRequest'
}

class AuthService extends ApiService {
  getAll = async () => this.apiClient.get(API_ENDPOINTS.FRIENDS)

  respondToFriendRequest = async ({ userId, accept }) => {
    return this.apiClient.post(API_ENDPOINTS.RESPOND_TO_FRIEND_REQUEST, {
      userId,
      accept
    })
  }

  removeFriend = async ({ userId }) => {
    return this.apiClient.delete(API_ENDPOINTS.REMOVE_FRIEND, { data: { userId } })
  }

  searchUser = async({ text, offset, limit }) => {
    return this.apiClient.get(`${API_ENDPOINTS.SEARCH_USER}?text=${text}&offset=${offset}&limit=${limit}`)
  }

  sendFriendRequest = async ({ userId }) => this.apiClient.post(API_ENDPOINTS.SEND_FRIEND_REQUEST, { userId })
}
export default new AuthService()
