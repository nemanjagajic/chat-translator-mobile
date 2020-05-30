import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import IconCheck from '../../assets/checkmark.svg'
import IconCheckDone from '../../assets/checkmark-done.svg'
import moment from 'moment'

const MessagesItem = memo(({
  text,
  textTranslated,
  isMine,
  isFirst,
  showOriginalMessages,
  isFriendTyping,
  isPending,
  createdAt,
  isSeen,
  showDateSeparator,
  nextMessageDate
}) => {
  return (
    <View>
      <View>
        {showOriginalMessages && (
          <View style={[
            styles.container,
            isMine ? styles.myMessage : styles.friendsMessage,
            styles.originalText,
          ]}>
            <Text style={[styles.text]}>{ text }</Text>
          </View>
        )}
        <View style={[
          styles.container,
          isMine ? styles.myMessage : styles.friendsMessage,
          {
            marginBottom: isFirst ? (isFriendTyping ? 50 : 20) : 0,
            backgroundColor: isPending ? Colors.MAIN_300 : isMine ? Colors.MAIN : Colors.WHITE_200,
            paddingBottom: 5
          },
        ]}>
          {isPending ? (
            <View style={styles.pendingContainer}>
              <AnimatedEllipsis
                numberOfDots={3}
                minOpacity={0.4}
                animationDelay={200}
                style={{
                  color: Colors.WHITE,
                  fontSize: 40,
                  marginTop: -20,
                  letterSpacing: -10
                }}
              />
            </View>
          ) : (
            <View style={styles.bottomMessage}>
              <Text style={[styles.text, { color: isMine ? Colors.WHITE : Colors.BLACK }]}>{ textTranslated || text }</Text>
              <View style={styles.messageMetaData}>
                <Text style={styles.dateText}>{ moment(createdAt).format('HH:mm') }</Text>
                { isMine && ( isSeen ? <IconCheckDone height={11} width={11} /> : <IconCheck height={11} width={11} />) }
              </View>
            </View>
          )}
        </View>
      </View>
      {showDateSeparator && (
        <View style={styles.separatorWrapper}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>{moment(nextMessageDate).format('MMM DD, YYYY')}</Text>
          <View style={styles.separatorLine} />
        </View>
      )}
    </View>
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
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
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
    color: Colors.BLACK,
    paddingRight: 10
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
  },
  messageMetaData: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  dateText: {
    fontSize: 11,
    color: Colors.GRAY_300,
    paddingRight: 2,
    paddingLeft: 5
  },
  bottomMessage: {
    display: 'flex',
    flexDirection: 'column'
  },
  pendingContainer: {
    height: 37,
    width: 42,
    display: 'flex',
    alignItems: 'center'
  },
  separatorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 20,
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
    alignSelf: 'center'
  },
  separatorLine: {
    width: '30%',
    height: 1,
    backgroundColor: Colors.WHITE_200
  },
  separatorText: {
    color: Colors.GRAY_300,
    fontSize: 12
  }
})

export default MessagesItem
