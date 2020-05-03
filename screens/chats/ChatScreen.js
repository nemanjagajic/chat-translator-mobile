import React, {useEffect, useState, useRef} from 'react'
import {StyleSheet, KeyboardAvoidingView, FlatList} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import {
  clearMessages,
  clearOpenedChat,
  getMessages,
  sendMessage,
  setMessagesOffset,
  setOpenedChat
} from '../../store/chats/actions'
import MessagesList from '../../components/messages/MessagesList'
import MessageInput from '../../components/messages/MessageInput'
import ChatNavbar from '../../components/chats/ChatNavbar'
import {MESSAGES_PAGINATION_LIMIT} from '../../constants/Messages'

const KEYBOARD_VERTICAL_OFFSET = 72

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chats.messages)
  const offset = useSelector(state => state.chats.messagesOffset)
  const activeUser = useSelector(state => state.auth.user)
  const chatId = navigation.getParam('chatId')

  let listRef = useRef(null);

  useEffect(() => {
    dispatch(setOpenedChat({
      _id: chatId
    }))
    dispatch(getMessages({
      chatId,
    }))

    return () => {
      dispatch(clearOpenedChat())
      dispatch(clearMessages())
      dispatch(setMessagesOffset(0))
    }
  }, [])

  const handleSendMessage = text => {
    dispatch(sendMessage({
      text,
      chatId,
    }))
  }

  const fetchAdditionalMessages = () => {
    if (messages.length < MESSAGES_PAGINATION_LIMIT * offset) return
    dispatch(getMessages({
      chatId,
    }))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container} behavior={'height'}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      <MessagesList
        forwardedRef={listRef}
        messages={messages}
        activeUser={activeUser}
        fetchAdditionalMessages={fetchAdditionalMessages}
      />
      <MessageInput
        sendMessage={handleSendMessage}
        handleInputFocus={() => listRef.current.scrollToOffset({ animated: true, offset: 0 })}
      />
    </KeyboardAvoidingView>
  )
}

ChatScreen.navigationOptions = ({ navigation }) => ({
  title: null,
  headerStyle: {
    backgroundColor: Colors.BACKGROUND,
    shadowColor: 'transparent',
    elevation: 0
  },
  headerLeft: () => <ChatNavbar navigation={navigation} />
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullName: {
    fontSize: 18,
    color: Colors.BLACK,
    fontWeight: '500'
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 25,
    marginRight: 15
  }
})

export default ChatScreen
