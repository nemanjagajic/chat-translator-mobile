import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Colors from '../../constants/Colors'
import { FRIENDS, RECEIVED_REQUESTS, SENT_REQUESTS } from '../../constants/General'
import IconCheck from '../../assets/checkmark-done.svg'
import IconReject from '../../assets/close-red.svg'
import IconSend from '../../assets/paper-plane.svg'
import { removeFriend, respondToFriendRequest } from '../../store/friends/actions'
import $t from '../../i18n'
import { createChat } from '../../store/chats/actions'
import UserInitials from '../user/UserInitials'
import { limitTextLength } from '../../utils/textFormatter'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15
const MAX_TEXT_LENGTH = 22

const FriendsItem = ({ _id, firstName, lastName, email, isFirst, isLast, type, navigation }) => {
  const dispatch = useDispatch()

  const isRespondingToFriendRequest = useSelector(state => state.friends.isRespondingToFriendRequest)
  const chats = useSelector(state => state.chats.chats)

  const acceptFriend = () => {
    dispatch(respondToFriendRequest({ userId: _id, accept: true }))
  }

  const rejectFriend = sentRequest => {
    Alert.alert(
      $t('Friends.rejectFriend'),
      sentRequest ?
        $t('Friends.rejectMineAreYouSure', { firstName, lastName })
        : $t('Friends.rejectAreYouSure', { firstName, lastName }),
      [
        { text: $t('Common.yes'), onPress: () => dispatch(respondToFriendRequest({ userId: _id, accept: false })) },
        { text: $t('Common.cancel'), style: 'cancel' },
      ])
  }

  const handleRemoveFriend = () => {
    Alert.alert(
      $t('Friends.deleteFriend'),
      $t('Friends.deleteAreYouSure', { firstName, lastName }),
      [
        { text: $t('Common.yes'), onPress: () => dispatch(removeFriend({ userId: _id })) },
        { text: $t('Common.cancel'), style: 'cancel' },
      ])
  }

  const openChat = () => {
    const chat = chats.find(c => c.friend._id === _id)
    if (chat) {
      navigation.navigate('ChatScreen', {
        chat: { _id: chat._id, friend: chat.friend, me: chat.me }
      })
    } else {
      dispatch(createChat({
        friendId: _id,
        navigation
      }))
    }
  }

  const renderOptions = () => {
    if (type === FRIENDS) {
      return (
        <View style={[styles.right, styles.receivedWrapper]}>
          <TouchableOpacity
            style={styles.button}
            onPress={openChat}
          >
            <IconSend height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRemoveFriend}
            disabled={isRespondingToFriendRequest}
          >
            <IconReject height={20} width={20} />
          </TouchableOpacity>
        </View>
      )
    }

    if (type === RECEIVED_REQUESTS) {
      return (
        <View style={[styles.right, styles.receivedWrapper]}>
          <TouchableOpacity
            style={styles.button}
            onPress={acceptFriend}
            disabled={isRespondingToFriendRequest}
          >
            <IconCheck height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={rejectFriend}
            disabled={isRespondingToFriendRequest}
          >
            <IconReject height={20} width={20} />
          </TouchableOpacity>
        </View>
      )
    }

    if (type === SENT_REQUESTS) {
      return (
        <View style={styles.right}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => rejectFriend(true)}
            disabled={isRespondingToFriendRequest}
          >
            <IconReject height={20} width={20} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <View style={[
      styles.container,
      { marginTop: isFirst ? FIRST_ITEM_TOP_MARGIN : DEFAULT_TOP_MARGIN },
      { marginBottom: isLast ? LAST_ITEM_BOTTOM_MARGIN : DEFAULT_BOTTOM_MARGIN },
    ]}>
      <UserInitials firstName={firstName} lastName={lastName} />
      <View>
        <Text style={styles.fullNameText}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.emailText}>{limitTextLength(email, MAX_TEXT_LENGTH)}</Text>
      </View>
      {renderOptions()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  fullNameText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: '500',
    paddingBottom: 5
  },
  emailText: {
    fontSize: 14,
    color: Colors.GRAY
  },
  right: {
    position: 'absolute',
    right: 0
  },
  button: {
    backgroundColor: Colors.WHITE_200,
    padding: 10,
    borderRadius: 30,
    marginLeft: 15,
  },
  confirmText: {
    color: Colors.WHITE,
    fontSize: 15,
    textAlign: 'center'
  },
  rejectText: {
    color: Colors.WHITE,
    fontSize: 15,
    textAlign: 'center'
  },
  receivedWrapper: {
    display: 'flex',
    flexDirection: 'row'
  }
})

export default FriendsItem
