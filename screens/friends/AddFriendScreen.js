import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import SearchInput from '../../components/inputs/SearchInput'
import $t from '../../i18n'
import Colors from '../../constants/Colors'
import IconBack from '../../assets/arrow-back-outline.svg'
import { getFriends, searchUser, setSearchList } from '../../store/friends/actions'
import SearchList from '../../components/search/SearchList'

const AddFriendScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const searchList = useSelector(state => state.friends.searchList)
  const isFetchingSearchList = useSelector(state => state.friends.isFetchingSearchList)
  const friendRequests = useSelector(state => state.friends.friendRequests)
  const activeUser = useSelector(state => state.auth.user)
  const receivedRequests = friendRequests.filter(fr => !fr.requestedByMe)
  const sentRequests = friendRequests.filter(fr => fr.requestedByMe)

  const [value, setValue] = useState('')

  useEffect(() => {
    return () => {
      dispatch(setSearchList([]))
    }
  }, [])

  return (
    <View style={styles.container}>
      <SearchInput
        value={value}
        onChangeText={setValue}
        searchUser={text => dispatch(searchUser({ text, offset: 0 }))}
      />
      {isFetchingSearchList ? (
        <ActivityIndicator style={styles.indicator} size="large" color={Colors.ACCENT} />
      ) : (
        <View style={styles.listWrapper}>
          {searchList && searchList.length > 0 ? (
            <SearchList
              users={searchList}
              receivedRequests={receivedRequests}
              sentRequests={sentRequests}
              navigation={navigation}
              activeUser={activeUser}
            />
          ) : (
            <Text style={styles.searchResults}>{$t('Friends.searchResults')}</Text>
          )}
        </View>
      )}
    </View>
  )
}

AddFriendScreen.navigationOptions = ({ navigation }) => ({
  title: $t('Friends.addFriendTitle'),
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
    backgroundColor: Colors.WHITE
  },
  indicator: {
    marginTop: 30
  },
  listWrapper: {
    flex: 1
  },
  searchResults: {
    fontSize: 16,
    color: Colors.GRAY_300,
    alignSelf: 'center',
    marginTop: 30
  }
})

export default AddFriendScreen
