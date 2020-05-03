import io from 'socket.io-client'
import config from '../config'

const socket = io(config.APP_URL, {
  transports: ['websocket'],
})

export default socket
