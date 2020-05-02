import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Colors from '../../constants/Colors'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15

const ChatsItem = ({ friend, lastMessage, isFirst, isLast }) => {
  return (
    <View style={[
      styles.container,
      { marginTop: isFirst ? FIRST_ITEM_TOP_MARGIN : DEFAULT_TOP_MARGIN },
      { marginBottom: isLast ? LAST_ITEM_BOTTOM_MARGIN : DEFAULT_BOTTOM_MARGIN },
    ]}>
      <Image
        style={styles.image}
        source={defaultAvatar}
      />
      <View>
        <Text style={styles.fullNameText}>{`${friend.firstName} ${friend.lastName}`}</Text>
        <Text style={styles.emailText}>{`${lastMessage.text}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    marginBottom: 15,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 15
  },
  fullNameText: {
    fontSize: 18,
    color: Colors.BLACK,
    fontWeight: '500',
    paddingBottom: 5
  },
  emailText: {
    fontSize: 16,
    color: Colors.GRAY
  },
  iconMore: {
    position: 'absolute',
    right: 10
  }
})

export default ChatsItem
