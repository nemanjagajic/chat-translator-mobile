import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import Colors from '../../constants/Colors'
import MessagesItem from './MessagesItem'

const MessagesList = ({
  messages, activeUser, fetchAdditionalMessages, forwardedRef, showOriginalMessages, isLoading, isFriendTyping, friendLastVisit
}) => {
  return (
    <View style={styles.container}>
      {isLoading && messages.length === 0 ? (
        <AnimatedEllipsis
          numberOfDots={3}
          minOpacity={0.4}
          animationDelay={200}
          style={{
            color: Colors.MAIN_300,
            fontSize: 80,
            letterSpacing: -15,
            marginBottom: 80,
            width: 22,
          }}
        />
      ) : (
        <FlatList
          ref={forwardedRef}
          inverted
          style={styles.list}
          data={messages}
          renderItem={({ item, index }) => (
            <MessagesItem
              {...item}
              isFirst={index === 0}
              isMine={item.senderId === activeUser._id}
              showOriginalMessages={showOriginalMessages}
              isFriendTyping={isFriendTyping}
              isPending={!!item.pending}
              isSeen={friendLastVisit >= item.createdAt}
            />
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={1}
          onEndReached={fetchAdditionalMessages}
        />
      )}
      {isFriendTyping && (
        <View style={styles.typing}>
          <AnimatedEllipsis
            numberOfDots={3}
            minOpacity={0.4}
            animationDelay={200}
            style={{
              color: Colors.MAIN_300,
              fontSize: 48,
              marginTop: -30,
              letterSpacing: -10,
              width: 12
            }}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    width: '100%'
  },
  typing: {
    width: 100,
    height: 40,
    backgroundColor: Colors.WHITE_300,
    left: 10,
    bottom: 5,
    position: 'absolute',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MessagesList
