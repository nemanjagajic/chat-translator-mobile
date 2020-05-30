import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, AppState } from 'react-native'
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/Colors'
import AddFriendButton from '../components/buttons/AddFriendButton'
import SearchButton from '../components/buttons/SearchButton'
import $t from '../i18n'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../store/chats/actions'
import ChatsList from '../components/chats/ChatsList'
import IconSend from '../assets/paper-plane-outline.svg'
import IconMenu from '../assets/menu-outline.svg'
import IconPlanet from '../assets/planet-outline.svg'
import { registerNotificationToken } from '../store/auth/actions'
import {BACKGROUND, DEFAULT, GRANTED, SELECTED} from '../constants/General'

const HomeScreen = props => {
  const dispatch = useDispatch()
  const [notificationSubscription, setNotificationSubscription] = useState(null)
  const chats = useSelector(state => state.chats.chats)
  const isFetchingChats = useSelector(state => state.chats.isFetchingChats)

  useEffect(() => {
    dispatch(getChats({ showLoadingIndicator: true }))
    setupNotifications()
    return () => {
      if (notificationSubscription) notificationSubscription.remove()
    }
  }, [])

  const setupNotifications = async () => {
    await registerForPushNotifications()
    const subscription = Notifications.addListener(handleNotification)
    setNotificationSubscription(subscription)
  }

  const registerForPushNotifications = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== GRANTED) {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== GRANTED) {
        alert($t('Notifications.tokenFail'))
        return
      }
      const token = await Notifications.getExpoPushTokenAsync()
      dispatch(registerNotificationToken({ token }))
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync(DEFAULT, {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }
  }

  const handleNotification = notification => {
    if (AppState.currentState === 'active' && notification.origin === 'received' && Platform.OS === 'android') {
      Notifications.dismissAllNotificationsAsync()
    }

    if (notification.origin === SELECTED) {
      const { data } = notification
      props.navigation.navigate('ChatScreen', {
        chat: data.chat,
      })
    }
  }

  return (
    <View style={styles.container}>
      {
        isFetchingChats ? (
          <ActivityIndicator style={styles.indicator} size='large' color={Colors.ACCENT} />
        ) : (
          <View style={styles.contentWrapper}>
            {chats.length > 0 ? (
              <ChatsList chats={chats} navigation={props.navigation} />
            ) : (
              <View style={styles.emptyChat}>
                <IconPlanet height={72} width={72} />
                <Text style={styles.emptyChatText}>{$t('Home.emptyChatDesc')}</Text>
              </View>
            )}
          </View>
        )
      }
      <TouchableOpacity
        style={styles.newMessageButton}
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
