import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import Colors from '../../constants/Colors'
import MessagesItem from './MessagesItem'

const MessagesList = ({ messages, activeUser, fetchAdditionalMessages, forwardedRef, showOriginalMessages, isLoading }) => {
  return (
    <View style={styles.container}>
      {isLoading || messages.length === 0 ? (
        <AnimatedEllipsis
          numberOfDots={3}
          minOpacity={0.4}
          animationDelay={200}
          style={{
            color: Colors.MAIN_300,
            fontSize: 100,
            letterSpacing: -15,
            marginBottom: 100
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
            />
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={1}
          onEndReached={fetchAdditionalMessages}
        />
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
  }
})

export default MessagesList
