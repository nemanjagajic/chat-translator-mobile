import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import FriendsItem from './FriendsItem'
import Colors from '../../constants/Colors'

const FriendsList = ({ friends, type, navigation }) => {
  return (
    <FlatList
      style={styles.container}
      data={friends}
      renderItem={({ item, index }) => (
        <FriendsItem
          {...item}
          type={type}
          isFirst={index === 0}
          isLast={index === friends.length - 1}
          navigation={navigation}
        />
      )}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

export default FriendsList
