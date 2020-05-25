import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, Platform, Text } from 'react-native'
import Colors from '../../constants/Colors'
import IconSend from '../../assets/paper-plane.svg'
import IconSendAlt from '../../assets/paper-plane-alt.svg'
import socket from '../../socket'

const MessageInput = ({ sendMessage, handleInputFocus, openedChat, isSendingMessage }) => {
  const [value, setValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (value.length > 0 && !isTyping) {
      setIsTyping(true)
      socket.emit('startedTyping', {
        friendId: openedChat && openedChat.friend._id,
        chatId: openedChat._id
      })
    }
    if (value.length === 0 && isTyping) {
      setIsTyping(false)
      socket.emit('stoppedTyping', {
        friendId: openedChat && openedChat.friend._id,
        chatId: openedChat._id
      })
    }
  }, [value])

  return (
    <View style={styles.container}>
      <TextInput
        onFocus={handleInputFocus}
        value={value}
        onChangeText={text => setValue(text)}
        style={[styles.input, { paddingTop: Platform.OS === 'ios' ? 12 : 10 }]}
        multiline={true}
        placeholder={'Type a message'}
      />
      <TouchableOpacity
        onPress={() => {
          sendMessage(value)
          setValue('')
        }}
        style={[styles.sendButton]}
        disabled={value === '' || isSendingMessage}
      >
        {(value === '' || isSendingMessage) ? (
          <IconSendAlt height={28} width={28} />
        ) : (
          <IconSend height={28} width={28} />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    elevation: 1
  },
  input: {
    backgroundColor: Colors.WHITE_200,
    color: Colors.BLACK,
    padding: 10,
    flex: 1,
    minHeight: 45,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    fontSize: 16,
    display: 'flex'
  },
  sendButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: Colors.WHITE_300
  }
})

export default MessageInput

