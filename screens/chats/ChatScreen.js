import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import {
  clearMessages,
  clearOpenedChat, getChats,
  getMessages,
  sendMessage,
  setMessagesOffset,
  setOpenedChat
} from '../../store/chats/actions'
import MessagesList from '../../components/messages/MessagesList'
import MessageInput from '../../components/messages/MessageInput'
import ChatNavbar from '../../components/chats/ChatNavbar'
import { MESSAGES_PAGINATION_LIMIT } from '../../constants/Messages'
import IconSettings from '../../assets/settings-outline.svg'
import ChatSettingsModal from '../../components/modals/ChatSettingsModal'

const KEYBOARD_VERTICAL_OFFSET = 72

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chats.messages)
  const offset = useSelector(state => state.chats.messagesOffset)
  const openedChat = useSelector(state => state.chats.openedChat)
  const activeUser = useSelector(state => state.auth.user)
  const isFetchingMessages = useSelector(state => state.chats.isFetchingMessages)

  const chat = navigation.getParam('chat')

  const [isModalOpen, setModalOpen] = useState(false)

  let listRef = useRef(null)

  useEffect(() => {
    dispatch(setOpenedChat({
      _id: chat._id,
      me: chat.me,
      friend: chat.friend
    }))
    dispatch(getMessages({
      chatId: chat._id,
    }))

    return () => {
      dispatch(clearOpenedChat())
      dispatch(clearMessages())
      dispatch(setMessagesOffset(0))
      dispatch(getChats({ showLoadingIndicator: false }))
    }
  }, [])

  useEffect(() => {
    navigation.setParams({
      toggleModal: () => setModalOpen(!isModalOpen)
    })
  }, [isModalOpen])

  const handleSendMessage = text => {
    dispatch(sendMessage({
      text,
      chatId: chat._id,
    }))
  }

  const fetchAdditionalMessages = () => {
    if (messages.length < MESSAGES_PAGINATION_LIMIT * offset) return
    dispatch(getMessages({
      chatId: chat._id,
    }))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container} behavior={'height'}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      {openedChat && (
        <MessagesList
          showOriginalMessages={openedChat && openedChat.me.showOriginalMessages}
          forwardedRef={listRef}
          messages={messages}
          activeUser={activeUser}
          fetchAdditionalMessages={fetchAdditionalMessages}
          isLoading={isFetchingMessages}
        />
      )}
      <MessageInput
        sendMessage={handleSendMessage}
        handleInputFocus={() => listRef.current.scrollToOffset({ animated: true, offset: 0 })}
      />
      {openedChat && (
        <ChatSettingsModal
          chat={openedChat}
          showOriginalMessages={openedChat && openedChat.me.showOriginalMessages}
          isOpen={isModalOpen}
          closeModal={() => { setModalOpen(false) }}
        />
      )}

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
  headerLeft: () => <ChatNavbar navigation={navigation} />,
  headerRight: () => (
    <TouchableOpacity
      onPress={navigation.state.params.toggleModal}
      style={styles.settingsButton}
    >
      <IconSettings height={28} width={28} />
    </TouchableOpacity>
  )
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
  },
  settingsButton: {
    marginRight: 20,
  }
})

export default ChatScreen
