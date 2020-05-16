import React, { useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import $t from '../../i18n'
import { getFriends } from '../../store/friends/actions'
import FriendsList from '../../components/friends/FriendsList'
import IconBack from '../../assets/arrow-back-outline.svg'

const FriendsScreen = () => {
  const dispatch = useDispatch()
  const friends = useSelector(state => state.friends.friends)
  const isFetching = useSelector(state => state.friends.isFetchingFriends)

  useEffect(() => {
    dispatch(getFriends())
  }, [])

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator style={styles.indicator} size="large" color={Colors.ACCENT} />
      ): (
        <FriendsList friends={friends} isFetching={isFetching} />
      )}
    </View>
  )
}

FriendsScreen.navigationOptions = ({ navigation }) => ({
  title: $t('Friends.headerTitle'),
  headerStyle: {
    backgroundColor: Colors.BACKGROUND,
    shadowColor: 'transparent',
    elevation: 0
  },
  headerTitleStyle: {
    color: Colors.MAIN,
    fontSize: 22
  },
  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => navigation.goBack()}
    >
      <IconBack height={28} width={28} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND
  },
  indicator: {
    marginTop: 50
  }
})

export default FriendsScreen
