import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import $t from '../../i18n'
import { getFriends } from '../../store/friends/actions'
import FriendsList from '../../components/friends/FriendsList'
import IconBack from '../../assets/arrow-back-outline.svg'
import { FRIENDS, RECEIVED_REQUESTS, SENT_REQUESTS } from '../../constants/General'

const FriendsScreen = () => {
  const dispatch = useDispatch()
  const friends = useSelector(state => state.friends.friends)
  const friendRequests = useSelector(state => state.friends.friendRequests)
  const isFetching = useSelector(state => state.friends.isFetchingFriends)

  const [selected, setSelected] = useState(FRIENDS)

  useEffect(() => {
    dispatch(getFriends())
  }, [])

  const selectedData = () => {
    if (selected === FRIENDS) return friends
    if (selected === RECEIVED_REQUESTS) return friendRequests.filter(fr => !fr.requestedByMe)
    if (selected === SENT_REQUESTS) return friendRequests.filter(fr => fr.requestedByMe)
  }

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator style={styles.indicator} size="large" color={Colors.ACCENT} />
      ): (
        <View style={styles.listWrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              style={selected === FRIENDS ? styles.headerItemActive : styles.headerItem}
              onPress={() => setSelected(FRIENDS)}
            >
              <Text style={selected === FRIENDS ? styles.headerTextActive : styles.headerText}>
                {$t('Friends.friends')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={selected === RECEIVED_REQUESTS ? styles.headerItemActive : styles.headerItem}
              onPress={() => setSelected(RECEIVED_REQUESTS)}
            >
              <Text style={selected === RECEIVED_REQUESTS ? styles.headerTextActive : styles.headerText}>
                {$t('Friends.receivedRequests')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={selected === SENT_REQUESTS ? styles.headerItemActive : styles.headerItem}
              onPress={() => setSelected(SENT_REQUESTS)}
            >
              <Text style={selected === SENT_REQUESTS ? styles.headerTextActive : styles.headerText}>
                {$t('Friends.sentRequests')}
              </Text>
            </TouchableOpacity>
          </View>
          <FriendsList friends={selectedData()} isFetching={isFetching} />
        </View>
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
  },
  listWrapper: {
    flex: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 10
  },
  headerItem: {
    backgroundColor: Colors.WHITE_100,
    padding: 10,
    borderRadius: 20
  },
  headerText: {
    color: Colors.GRAY,
    fontSize: 15
  },
  headerItemActive: {
    backgroundColor: Colors.MAIN,
    padding: 10,
    borderRadius: 30
  },
  headerTextActive: {
    color: Colors.WHITE,
    fontSize: 15
  }
})

export default FriendsScreen
