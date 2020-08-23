import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Colors from '../../constants/Colors'
import { formatChatPreviewDate } from '../../utils/dateFormatter'
import $t from '../../i18n'
import UserInitials from '../user/UserInitials'
import { limitTextLength } from '../../utils/textFormatter'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15
const MAX_TEXT_LENGTH = 25

const ChatsItem = ({ _id, friend, me, lastMessage: { text, textTranslated, createdAt, senderId }, isFirst, isLast, navigation, clearSearch, friendsTyping }) => {
  const textToDisplay = textTranslated || text

  const handlePress = () => {
    navigation.navigate('ChatScreen', {
      chat: { _id, friend, me },
    })
    clearSearch()
  }

  const textToShow = () => {
    const isTyping = friendsTyping.find(chatId => chatId === _id)
    if (isTyping) return <Text style={styles.typing}>{$t('Chat.typing')}</Text>

    return textToDisplay ? (
      <Text style={
        (me.lastVisit <= createdAt && senderId !== me._id)
          ? styles.chatTextUnread
          : styles.chatText}
      >
        {limitTextLength(textToDisplay, MAX_TEXT_LENGTH)}
      </Text>
    ) : (
      <Text style={styles.noMessages}>{$t('Chat.noMessages')}</Text>
    )
  }

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
      <View
        style={[
          styles.container,
          { marginTop: isFirst ? FIRST_ITEM_TOP_MARGIN : DEFAULT_TOP_MARGIN },
          { marginBottom: isLast ? LAST_ITEM_BOTTOM_MARGIN : DEFAULT_BOTTOM_MARGIN },
        ]}
      >
        <UserInitials firstName={friend && friend.firstName} lastName={friend && friend.lastName} />
        <View>
          <Text style={styles.fullNameText}>{`${friend.firstName} ${friend.lastName}`}</Text>
          {textToShow()}
        </View>
        {textToDisplay && <Text style={styles.date}>{formatChatPreviewDate(createdAt)}</Text>}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  fullNameText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: '500',
    paddingBottom: 5
  },
  chatText: {
    fontSize: 14,
    color: Colors.GRAY
  },
  chatTextUnread: {
    fontSize: 14,
    color: Colors.BLACK,
    fontWeight: '700'
  },
  date: {
    position: 'absolute',
    right: 10,
    fontSize: 12,
    color: Colors.GRAY
  },
  noMessages: {
    fontSize: 14,
    color: Colors.GRAY_300,
    fontStyle: 'italic'
  },
  typing: {
    fontSize: 14,
    color: Colors.GRAY,
    fontStyle: 'italic'
  }
})

export default ChatsItem
