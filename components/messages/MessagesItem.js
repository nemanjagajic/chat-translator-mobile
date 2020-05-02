import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import {formatMessageDate} from '../../utils/dateFormatter'

const MessagesItem = ({ text, createdAt, isMine }) => {
  return (
    <View style={[styles.container, isMine ? styles.myMessage : styles.friendsMessage]}>
      <Text style={[styles.text, { color: isMine ? Colors.WHITE : Colors.BLACK }]}>{ text }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
    borderRadius: 30,
    maxWidth: '90%'
  },
  myMessage : {
    backgroundColor: Colors.MAIN,
    alignSelf: 'flex-end',
    marginRight: 10
  },
  friendsMessage: {
    backgroundColor: Colors.WHITE_200,
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  text: {
    fontSize: 16
  },
  date: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: Colors.GRAY
  }
})

export default MessagesItem
