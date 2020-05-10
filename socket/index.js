import io from 'socket.io-client'
import config from '../config'
import {AsyncStorage} from 'react-native'

const socket = io(config.APP_URL, {
  transports: ['websocket'],
})

socket.on('connect', async () => {
  const user = await AsyncStorage.getItem('user')
  socket.emit('createUserSession', {
    userId: JSON.parse(user)._id,
    socketId: socket.id
  })
})

export default socket
