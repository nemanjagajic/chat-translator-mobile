import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Colors from '../../constants/Colors'
import IconAddFriend from '../../assets/person-add.svg'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15

const SearchItem = ({ _id, firstName, lastName, email, isFirst, isLast, isFriend }) => {
  const dispatch = useDispatch()

  return (
    <View style={[
      styles.container,
      { marginTop: isFirst ? FIRST_ITEM_TOP_MARGIN : DEFAULT_TOP_MARGIN },
      { marginBottom: isLast ? LAST_ITEM_BOTTOM_MARGIN : DEFAULT_BOTTOM_MARGIN },
    ]}>
      <Image
        style={styles.image}
        source={defaultAvatar}
      />
      <View>
        <Text style={styles.fullNameText}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.emailText}>{`${email}`}</Text>
      </View>
      {!isFriend && (
        <TouchableOpacity
          style={[styles.right, styles.button]}
        >
          <IconAddFriend width={22} height={22} />
        </TouchableOpacity>
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
  image: {
    width: 50,
    height: 50,
    marginRight: 15
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

export default SearchItem
