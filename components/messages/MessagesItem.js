import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

const MessagesItem = memo(({ text, isMine, isFirst }) => (
  <View style={[styles.container, isMine ? styles.myMessage : styles.friendsMessage, { marginBottom: isFirst ? 20 : 0 }]}>
    <Text style={[styles.text, { color: isMine ? Colors.WHITE : Colors.BLACK }]}>{ text }</Text>
  </View>
))

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
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
    fontSize: 15
  },
  date: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: Colors.GRAY
  }
})

export default MessagesItem
