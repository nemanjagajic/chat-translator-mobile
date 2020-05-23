import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Colors from '../../constants/Colors'
import { formatChatPreviewDate } from '../../utils/dateFormatter'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15
const TEXT_LIMIT = 25

const ChatsItem = ({ _id, friend, me, lastMessage: { text, createdAt }, isFirst, isLast, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ChatScreen', {
        chat: { _id, friend, me },
        friend
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
          <Text style={styles.chatText}>
            {
              ((text).length > TEXT_LIMIT) ?
                (((text).substring(0, TEXT_LIMIT - 3)).trim() + '...') :
                text
            }
          </Text>
        </View>
        <Text style={styles.date}>{formatChatPreviewDate(createdAt)}</Text>
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
  date: {
    position: 'absolute',
    right: 10,
    fontSize: 12,
    color: Colors.GRAY
  }
})

export default ChatsItem
