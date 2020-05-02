import React, {useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import AddFriendButton from '../components/buttons/AddFriendButton'
import SearchButton from '../components/buttons/SearchButton'
import $t from '../i18n'
import {useDispatch, useSelector} from 'react-redux'
import {getChats} from '../store/chats/actions'
import ChatsList from '../components/chats/ChatsList'

const HomeScreen = props => {
  const dispatch = useDispatch()
  const chats = useSelector(state => state.chats.chats)
  const isFetchingChats = useSelector(state => state.chats.isFetchingChats)

  useEffect(() => {
    dispatch(getChats())
  }, [])

  return (
    <View style={styles.container}>
      {
        isFetchingChats ? (
          <ActivityIndicator style={styles.indicator} size="large" color={Colors.ACCENT} />
        ) : (
          <View style={styles.contentWrapper}>
            {chats.length > 0 ? (
              <ChatsList chats={chats} navigation={props.navigation} />
            ) : (
              <View style={styles.emptyChat}>
                <Ionicons style={styles.emptyChatIcon} name="md-planet" size={72} color={Colors.MAIN_300} />
                <Text style={styles.emptyChatText}>{$t('Home.emptyChatDesc')}</Text>
              </View>
            )}
          </View>
        )
      }
      <TouchableOpacity
        style={styles.newMessageButton}
      >
        <Ionicons name="ios-send" size={30} color={Colors.MAIN} />
      </TouchableOpacity>
    </View>
  )
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: $t('Home.headerTitle'),
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
      style={styles.menuIcon}
      onPress={() => navigation.openDrawer()}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="ios-menu" size={28} color={Colors.MAIN} />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <View style={styles.headerRight}>
      <AddFriendButton style={{ marginRight: 20 }} />
      <SearchButton />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
  },
  menuIcon: {
    marginLeft: 15
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 15
  },
  emptyChat: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
    paddingTop: 200
  },
  emptyChatIcon: {
    marginBottom: 10
  },
  emptyChatText: {
    textAlign: 'center',
    color: Colors.MAIN_300,
    fontSize: 14
  },
  newMessageButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.ACCENT,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 1
  },
  indicator: {
    marginTop: 50
  },
  contentWrapper: {
    flex: 1,
    width: '100%'
  }
})

export default HomeScreen
