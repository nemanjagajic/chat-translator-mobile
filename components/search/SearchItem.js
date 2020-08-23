import React from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import IconAddFriend from '../../assets/person-add.svg'
import { respondToFriendRequest, sendFriendRequest } from '../../store/friends/actions'
import IconCheck from '../../assets/checkmark-done.svg'
import { ACCEPTED_FRIEND, ADDED_FRIEND } from '../../constants/Friends'
import $t from '../../i18n'
import UserInitials from '../user/UserInitials'
import {limitTextLength} from '../../utils/textFormatter'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15

const SearchItem = ({ _id, firstName, lastName, email, isFirst, isLast, isFriend, receivedRequests, sentRequests, navigation, activeUser }) => {
  const dispatch = useDispatch()
  const pending = sentRequests && sentRequests.find(r => r._id === _id)
  const received = receivedRequests && receivedRequests.find(r => r._id === _id)

  const acceptFriend = () => {
    dispatch(respondToFriendRequest({ userId: _id, accept: true, navigation, label: ACCEPTED_FRIEND }))
  }

  const sendRequest = () => {
    dispatch(sendFriendRequest({ userId: _id, navigation, label: ADDED_FRIEND }))
  }

  if (activeUser && activeUser._id === _id) return null

  return (
    <View style={[
      styles.container,
      { marginTop: isFirst ? FIRST_ITEM_TOP_MARGIN : DEFAULT_TOP_MARGIN },
      { marginBottom: isLast ? LAST_ITEM_BOTTOM_MARGIN : DEFAULT_BOTTOM_MARGIN },
    ]}>
      <UserInitials firstName={firstName} lastName={lastName} />
      <View>
        <Text style={styles.fullNameText}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.emailText}>{limitTextLength(email, 28)}</Text>
      </View>
      {(!isFriend && !received && !pending) && (
        <TouchableOpacity
          onPress={sendRequest}
          style={[styles.right, styles.button]}
        >
          <IconAddFriend width={22} height={22} />
        </TouchableOpacity>
      )}
      {received && (
        <TouchableOpacity
          onPress={acceptFriend}
          style={[styles.right, styles.button]}
        >
          <IconCheck height={20} width={20} />
        </TouchableOpacity>
      )}
      {pending && (
        <View
          style={[styles.right, styles.label]}
        >
          <Text style={styles.labelText}>{$t('Friends.pending')}</Text>
        </View>
      )}
      {isFriend && (
        <View
          onPress={() => dispatch(sendFriendRequest({ userId: _id }))}
          style={[styles.right, styles.label]}
        >
          <Text style={styles.labelText}>{$t('Friends.friends')}</Text>
        </View>
      )}
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
    color: Colors.GRAY,
    flexWrap: 'wrap'
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
  },
  labelText: {
    color: Colors.GRAY
  },
  label: {
    padding: 10,
    borderRadius: 30,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: Colors.WHITE_200
  }
})

export default SearchItem
