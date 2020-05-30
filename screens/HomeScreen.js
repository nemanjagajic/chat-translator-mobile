import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Vibration } from 'react-native'
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

const HomeScreen = props => {
  const dispatch = useDispatch()
  const chats = useSelector(state => state.chats.chats)
  const isFetchingChats = useSelector(state => state.chats.isFetchingChats)

  useEffect(async () => {
    dispatch(getChats({ showLoadingIndicator: true }))
    await registerForPushNotificationsAsync()
    Notifications.addListener(handleNotification)
  }, [])

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      const token = await Notifications.getExpoPushTokenAsync()
      dispatch(registerNotificationToken({ token }))
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }
  }

  const handleNotification = notification => {
    Vibration.vibrate()
    console.log({ notification })
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
