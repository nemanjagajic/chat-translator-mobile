import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const FIRST_ITEM_TOP_MARGIN = 20
const LAST_ITEM_BOTTOM_MARGIN = 30
const DEFAULT_TOP_MARGIN = 0
const DEFAULT_BOTTOM_MARGIN = 15

const FriendsItem = ({ firstName, lastName, email, isFirst, isLast }) => {
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
      <Ionicons style={styles.iconMore} name='ios-more' size={28} color={Colors.GRAY} />
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
  iconMore: {
    position: 'absolute',
    right: 10
  }
})

export default FriendsItem
