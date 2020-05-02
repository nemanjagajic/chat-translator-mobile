import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import MessagesItem from './MessagesItem'

const MessagesList = ({ messages, activeUser, fetchAdditionalMessages }) => {
  return (
    <FlatList
      inverted
      style={styles.container}
      data={messages}
      renderItem={({ item }) => (
        <MessagesItem {...item} isMine={item.senderId === activeUser._id} />
      )}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={1}
      onEndReached={fetchAdditionalMessages}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    width: '100%',
    marginBottom: 100
  }
})

export default MessagesList
