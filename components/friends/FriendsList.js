import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import FriendsItem from './FriendsItem'
import Colors from '../../constants/Colors'

const FriendsList = ({ friends }) => {
  return (
    <FlatList
      style={styles.container}
      data={friends}
      renderItem={({ item, index }) => (
        <FriendsItem {...item} isFirst={index === 0} isLast={index === friends.length - 1} />
      )}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
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