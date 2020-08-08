import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Colors from '../../constants/Colors'
import { formatChatPreviewDate } from '../../utils/dateFormatter'
import $t from '../../i18n'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15
const TEXT_LIMIT = 25

const ChatsItem = ({ _id, friend, me, lastMessage: { text, textTranslated, createdAt, senderId }, isFirst, isLast, navigation }) => {
  const textToDisplay = textTranslated || text

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ChatScreen', {
        chat: { _id, friend, me },
      })}
    >
      <View
        style={[
          styles.container,
          { marginTop: isFirst ? FIRST_ITEM_TOP_MARGIN : DEFAULT_TOP_MARGIN },
          { marginBottom: isLast ? LAST_ITEM_BOTTOM_MARGIN : DEFAULT_BOTTOM_MARGIN },
        ]}
      >
        <Image
          style={styles.image}
          source={defaultAvatar}
        />
        <View>
          <Text style={styles.fullNameText}>{`${friend.firstName} ${friend.lastName}`}</Text>
          {textToDisplay ? (
            <Text style={
              (me.lastVisit <= createdAt && senderId !== me._id)
                ? styles.chatTextUnread
                : styles.chatText}
            >
              {
                ((textToDisplay).length > TEXT_LIMIT) ?
                  (((textToDisplay).substring(0, TEXT_LIMIT - 3)).trim() + '...') :
                  textToDisplay
              }
            </Text>
          ) : (
            <Text style={styles.noMessages}>{$t('Chat.noMessages')}</Text>
          )}
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
  image: {
    width: 50,
    height: 50,
    marginRight: 15
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
  }
})

export default ChatsItem
