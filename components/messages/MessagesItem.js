import React, { memo, useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, UIManager, LayoutAnimation, Platform } from 'react-native'
import Colors from '../../constants/Colors'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const MessagesItem = memo(({ text, textTranslated, isMine, isFirst, showOriginalMessages, isFriendTyping }) => {
  const [showOriginal, setShowOriginal] = useState(showOriginalMessages)

  const handleMessagePressed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    // TODO show message data on click
    // setShowOriginal(!showOriginal)
  }

  return (
    <TouchableWithoutFeedback onPress={handleMessagePressed}>
      <View>
        {showOriginalMessages && (
          <View style={[
            styles.container,
            isMine ? styles.myMessage : styles.friendsMessage,
            styles.originalText
          ]}>
            <Text style={[styles.text]}>{ text }</Text>
          </View>
        )}
        <View style={[
          styles.container,
          isMine ? styles.myMessage : styles.friendsMessage,
          { marginBottom: isFirst ? (isFriendTyping ? 50 : 20) : 0 }
        ]}>
          <Text style={[styles.text, { color: isMine ? Colors.WHITE : Colors.BLACK }]}>{ textTranslated || text }</Text>
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
    maxWidth: '80%'
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
    color: Colors.BLACK
  },
  date: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: Colors.GRAY
  },
  originalText: {
    backgroundColor: Colors.WHITE_300,
    marginBottom: -10,
    opacity: 0.5
  }
})

export default MessagesItem
