import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, AppState, Platform } from 'react-native'
// import { Notifications } from 'expo'
// import * as ExpoNotifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/Colors'
import AddFriendButton from '../components/buttons/AddFriendButton'
import $t from '../i18n'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../store/chats/actions'
import ChatsList from '../components/chats/ChatsList'
import IconSend from '../assets/paper-plane-outline.svg'
import IconMenu from '../assets/menu-outline.svg'
import IconPlanet from '../assets/planet-outline.svg'
import { registerNotificationToken } from '../store/auth/actions'
import { DEFAULT, GRANTED, SELECTED } from '../constants/General'
import SearchInput from '../components/inputs/SearchInput'

const HomeScreen = props => {
  const dispatch = useDispatch()
  const isFetchingChats = useSelector(state => state.chats.isFetchingChats)
  const chats = useSelector(state => state.chats.chats)
  const friendsTyping = useSelector(state => state.chats.friendsTyping)
  // const [notificationSubscription, setNotificationSubscription] = useState(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    dispatch(getChats({ showLoadingIndicator: true }))
    // setupNotifications()
    // AppState.addEventListener('change', handleAppStateChange)
    // return () => {
    //   if (notificationSubscription) notificationSubscription.remove()
    //   AppState.removeEventListener('change', handleAppStateChange)
    // }
  }, [])

  // const dismissNotifications = () => {
  //   if (Platform.OS === 'android') {
  //     Notifications.dismissAllNotificationsAsync()
  //   } else {
  //     ExpoNotifications.dismissAllNotificationsAsync()
  //   }
  // }

  // const handleAppStateChange = () => {
  //   if (AppState.currentState === 'active') dismissNotifications()
  // }

  // const setupNotifications = async () => {
  //   await registerForPushNotifications()
  //   const subscription = Notifications.addListener(handleNotification)
  //   setNotificationSubscription(subscription)
  // }

  // const registerForPushNotifications = async () => {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  //     let finalStatus = existingStatus
  //     if (existingStatus !== GRANTED) {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  //       finalStatus = status
  //     }
  //     if (finalStatus !== GRANTED) {
  //       alert($t('Notifications.tokenFail'))
  //       return
  //     }
  //     const token = await Notifications.getExpoPushTokenAsync()
  //     dispatch(registerNotificationToken({ token }))
  //   }
  //
  //   if (Platform.OS === 'android') {
  //     Notifications.createChannelAndroidAsync(DEFAULT, {
  //       name: 'default',
  //       sound: true,
  //       priority: 'max',
  //       vibrate: [0, 250, 250, 250],
  //     })
  //   }
  // }

  // const handleNotification = notification => {
  //   if (AppState.currentState === 'active' && notification.origin === 'received') {
  //     dismissNotifications()
  //   }
  //
  //   if (notification.data && notification.data.type === 'friend') {
  //     props.navigation.navigate('FriendsScreen')
  //   }
  // }

  const filteredChats = text => {
    if (!chats) return []

    return chats.filter(c => {
      const { firstName, lastName } = c.friend
      const fullName = `${firstName} ${lastName}`
      return fullName.toLowerCase().includes(text.toLowerCase())
    })
  }

  const clearSearch = () => {
    setSearchText('')
  }

  return (
    <View style={styles.container}>
      {
        isFetchingChats ? (
          <ActivityIndicator style={styles.indicator} size='large' color={Colors.ACCENT} />
        ) : (
          <View style={styles.contentWrapper}>
            <SearchInput
              value={searchText}
              handleSearch={() => {}}
              onChangeText={text => setSearchText(text)}
              placeholder={$t('Chat.searchChat')}
              returnKeyType={'done'}
            />
            {filteredChats(searchText).length > 0 ? (
              <View style={styles.listWrapper}>
                <ChatsList
                  chats={filteredChats(searchText)}
                  navigation={props.navigation}
                  clearSearch={clearSearch}
                  friendsTyping={friendsTyping}
                />
              </View>
            ) : (
              <View style={styles.emptyChat}>
                <IconPlanet height={72} width={72} />
                <Text style={styles.emptyChatText}>{
                  chats.length === 0 ? $t('Home.emptyChatDesc') : $t('Home.noResults')
                }</Text>
              </View>
            )}
          </View>
        )
      }
      <TouchableOpacity
        style={styles.newMessageButton}
        onPress={() => props.navigation.navigate('FriendsScreen')}
      >
        <IconSend width={30} height={30} />
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
      <IconMenu height={28} width={28} />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <View style={styles.headerRight}>
      <AddFriendButton
        onPress={() => navigation.navigate('AddFriendScreen')}
        style={{ marginRight: 10 }}
      />
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
  emptyChatText: {
    textAlign: 'center',
    color: Colors.MAIN_300,
    fontSize: 14,
    marginTop: 10
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
    bottom: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    elevation: 1
  },
  indicator: {
    marginTop: 50
  },
  contentWrapper: {
    flex: 1,
    width: '100%'
  },
  listWrapper: {
    flex: 1
  }
})

export default HomeScreen
