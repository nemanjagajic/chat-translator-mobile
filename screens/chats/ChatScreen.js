import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image, KeyboardAvoidingView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import defaultAvatar from '../../assets/defaultAvatar.png'
import {clearMessages, clearOpenedChat, getMessages, setOpenedChat} from '../../store/chats/actions'
import MessagesList from '../../components/messages/MessagesList'
import MessageInput from '../../components/messages/MessageInput'

const LIMIT = 50
const KEYBOARD_VERTICAL_OFFSET = 72

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chats.messages)
  const activeUser = useSelector(state => state.auth.user)
  const chatId = navigation.getParam('chatId')

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    dispatch(setOpenedChat({
      _id: chatId
    }))
    dispatch(getMessages({
      chatId,
      offset: 0,
      limit: LIMIT
    }))

    return () => {
      dispatch(clearOpenedChat())
      dispatch(clearMessages())
    }
  }, [])

  const fetchAdditionalMessages = () => {
    if (messages.length < LIMIT * (offset + 1)) return
    dispatch(getMessages({
      chatId,
      offset: offset + 1,
      limit: LIMIT
    }))
    setOffset(offset + 1)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container} behavior={'height'}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      <MessagesList
        messages={messages}
        activeUser={activeUser}
        fetchAdditionalMessages={fetchAdditionalMessages}
      />
      <MessageInput />
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
  headerLeft: () => (
    <View style={styles.navigation}>
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="md-arrow-back" size={28} color={Colors.MAIN} />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={defaultAvatar}
      />
      <Text style={styles.fullName}>
        {`${navigation.getParam('friend').firstName} ${navigation.getParam('friend').lastName}`}
      </Text>
    </View>
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
  }
})

export default ChatScreen
