import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import ChatsItem from './ChatsItem'

const ChatsList = ({ chats }) => {
  return (
    <FlatList
      style={styles.container}
      data={chats}
      renderItem={({ item, index }) => (
        <ChatsItem {...item} isFirst={index === 0} isLast={index === chats.length - 1} />
      )}
      keyExtractor={item => item._id}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default ChatsList
