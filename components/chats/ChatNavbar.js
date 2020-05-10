import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import defaultAvatar from '../../assets/defaultAvatar.png'
import { getChats } from '../../store/chats/actions'

const ChatNavbar = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <View style={styles.navigation}>
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => {
          dispatch(getChats({ showLoadingIndicator: false }))
          navigation.goBack()
        }}
      >
        <Ionicons name="md-arrow-back" size={28} color={Colors.MAIN} />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={defaultAvatar}
      />
      <Text style={styles.fullName}>
        {`${navigation.getParam('friend').firstName} ${navigation.getParam('friend').lastName}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullName: {
    fontSize: 18,
    color: Colors.BLACK,
    fontWeight: '500'
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 25,
    marginRight: 15
  }
})

export default ChatNavbar
