import React, { useEffect, useState } from 'react'
import {View, TouchableOpacity, StyleSheet, ActivityIndicator, Text, BackHandler} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import $t from '../../i18n'
import { getFriends } from '../../store/friends/actions'
import FriendsList from '../../components/friends/FriendsList'
import IconBack from '../../assets/arrow-back-outline.svg'
import { FRIENDS, RECEIVED_REQUESTS, SENT_REQUESTS } from '../../constants/General'
import FriendsHeaderItem from '../../components/friends/FriendsHeaderItem'
import { ADDED_FRIEND } from '../../constants/Friends'
import SearchInput from '../../components/inputs/SearchInput'

const FriendsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const friends = useSelector(state => state.friends.friends)
  const friendRequests = useSelector(state => state.friends.friendRequests)
  const isFetching = useSelector(state => state.friends.isFetchingFriends)

  const [selected, setSelected] = useState(FRIENDS)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    dispatch(getFriends())
    const label = navigation.getParam('label')
    if (label) setSelected(label === ADDED_FRIEND ? SENT_REQUESTS : FRIENDS)
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => navigation.navigate('HomeScreen')
    )

    return () => {
      backHandler.remove()
    }
  }, [])

  const receivedRequests = friendRequests.filter(fr => !fr.requestedByMe)
  const sentRequests = friendRequests.filter(fr => fr.requestedByMe)

  const selectedData = () => {
    if (selected === FRIENDS) return friends
    if (selected === RECEIVED_REQUESTS) return receivedRequests
    if (selected === SENT_REQUESTS) return sentRequests
  }

  const filteredData = text => {
    if (!selectedData()) return []

    return selectedData().filter(item => {
      const { firstName, lastName } = item
      const fullName = `${firstName} ${lastName}`
      return fullName.toLowerCase().includes(text.toLowerCase())
    })
  }

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator style={styles.indicator} size="large" color={Colors.ACCENT} />
      ): (
        <View style={styles.listWrapper}>
          <View style={styles.header}>
            <FriendsHeaderItem
              type={FRIENDS}
              text={$t('Friends.friends')}
              selected={selected}
              setSelected={setSelected}
              number={friends && friends.length}
            />
            <FriendsHeaderItem
              type={RECEIVED_REQUESTS}
              text={$t('Friends.receivedRequests')}
              selected={selected}
              setSelected={setSelected}
              number={receivedRequests && receivedRequests.length}
            />
            <FriendsHeaderItem
              type={SENT_REQUESTS}
              text={$t('Friends.sentRequests')}
              selected={selected}
              setSelected={setSelected}
              number={sentRequests && sentRequests.length}
            />
          </View>
          <View style={styles.searchWrapper}>
            <SearchInput
              value={searchText}
              handleSearch={() => {}}
              onChangeText={text => setSearchText(text)}
              placeholder={$t('Chat.searchChat')}
              returnKeyType={'done'}
              customStyles={styles.searchInput}
            />
          </View>
          <FriendsList
            type={selected}
            friends={filteredData(searchText)}
            isFetching={isFetching}
            navigation={navigation}
          />
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
      onPress={() => navigation.navigate('HomeScreen')}
    >
      <IconBack height={28} width={28} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  indicator: {
    marginTop: 90
  },
  listWrapper: {
    flex: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 5,
    paddingHorizontal: 10
  },
  searchWrapper: {
    paddingHorizontal: 10
  },
  searchInput: {
    width: '100%',
    marginTop: 10
  }
})

export default FriendsScreen
