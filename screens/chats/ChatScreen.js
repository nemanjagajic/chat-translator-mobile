import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, BackHandler } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import {
  clearMessages,
  clearOpenedChat, getChats,
  getMessages,
  sendMessage, setChatVisited,
  setMessagesOffset,
  setOpenedChat
} from '../../store/chats/actions'
import MessagesList from '../../components/messages/MessagesList'
import MessageInput from '../../components/messages/MessageInput'
import ChatNavbar from '../../components/chats/ChatNavbar'
import { MESSAGES_PAGINATION_LIMIT } from '../../constants/Messages'
import IconSettings from '../../assets/settings-outline.svg'
import ChatSettingsModal from '../../components/modals/ChatSettingsModal'
import $t from '../../i18n'

const KEYBOARD_VERTICAL_OFFSET = 72

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chats.messages)
  const offset = useSelector(state => state.chats.messagesOffset)
  const openedChat = useSelector(state => state.chats.openedChat)
  const activeUser = useSelector(state => state.auth.user)
  const isFetchingMessages = useSelector(state => state.chats.isFetchingMessages)
  const isSendingMessage = useSelector(state => state.chats.isSendingMessage)
  const friendsTyping = useSelector(state => state.chats.friendsTyping)

  const chat = navigation.getParam('chat')

  const [isModalOpen, setModalOpen] = useState(false)
  const [isFriendTyping, setIsFriendTyping] = useState(false)
  const [isInitialModalSeen, setIsInitialModalSeen] = useState(false)

  let listRef = useRef(null)

  useEffect(() => {
    if (!chat) return
    dispatch(setOpenedChat({
      _id: chat._id,
      me: chat.me,
      friend: chat.friend
    }))
    dispatch(getMessages({
      chatId: chat._id,
    }))
    dispatch(setChatVisited({
      chatId: chat._id
    }))
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => navigation.navigate('HomeScreen')
    )

    return () => {
      dispatch(clearOpenedChat())
      dispatch(clearMessages())
      dispatch(setMessagesOffset(0))
      dispatch(getChats({ showLoadingIndicator: false }))
      backHandler.remove()
    }
  }, [])

  useEffect(() => {
    navigation.setParams({
      toggleModal: () => setModalOpen(!isModalOpen)
    })
  }, [isModalOpen])

  useEffect(() => {
    if (!openedChat) return
    const { me: { sendLanguage, receiveLanguage } } = openedChat
    if ((!sendLanguage || !receiveLanguage) && !isInitialModalSeen) {
      setIsInitialModalSeen(true)
      setModalOpen(true)
    }
    const isTyping = openedChat && !!friendsTyping.find(item => item === openedChat._id)
    setIsFriendTyping(isTyping)
  }, [friendsTyping, openedChat])

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
          isFriendTyping={isFriendTyping}
          friendLastVisit={openedChat && openedChat.friend.lastVisit}
        />
      )}
      {!isFetchingMessages && messages && messages.length === 0 && (
        <Text style={styles.emptyChat}>{$t('Chat.empty')}</Text>
      )}
      <MessageInput
        sendMessage={handleSendMessage}
        handleInputFocus={() => listRef.current && listRef.current.scrollToOffset({ animated: true, offset: 0 })}
        openedChat={openedChat}
        isSendingMessage={isSendingMessage}
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
  },
  emptyChat: {
    padding: 30,
    color: Colors.MAIN_300,
    textAlign: 'center',
    fontSize: 16
  }
})

export default ChatScreen
