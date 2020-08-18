import ApiService from '../ApiService'

const API_ENDPOINTS = {
  UPDATE_USER: '/auth/updateUser'
}

class AuthService extends ApiService {
  updateUser = data => {
    let formData = new FormData()
    const { avatar, firstName, lastName } = data
    if (avatar) {
      const uri = data.avatar.uri
      const name = uri.split('/').pop()
      const type = 'image/jpeg'
      formData.append('avatar', { uri, name, type })
    }

    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    return this.apiClient.post(API_ENDPOINTS.UPDATE_USER, formData)
  }
}

export default new AuthService()
