import React, { memo, useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Colors from '../../constants/Colors'

const MessagesItem = memo(({ text, textSr, isMine, isFirst }) => {
  const [showOriginal, setShowOriginal] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={() => setShowOriginal(!showOriginal)}>
      <View>
        {showOriginal && (
          <View style={[
            styles.container,
            isMine ? styles.myMessage : styles.friendsMessage,
            styles.originalText,
          ]}>
            <Text style={[styles.text]}>{ text }</Text>
          </View>
        )}
        <View style={[styles.container, isMine ? styles.myMessage : styles.friendsMessage, { marginBottom: isFirst ? 20 : 0 }]}>
          <Text style={[styles.text, { color: isMine ? Colors.WHITE : Colors.BLACK }]}>{ textSr || text }</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
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
    fontSize: 15,
    color: Colors.GRAY_300
  },
  date: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: Colors.GRAY
  },
  originalText: {
    backgroundColor: Colors.WHITE_300,
    marginBottom: -10
  }
})

export default MessagesItem
