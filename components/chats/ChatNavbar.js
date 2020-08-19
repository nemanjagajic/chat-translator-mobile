import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import IconBack from '../../assets/arrow-back-outline.svg'
import { clearMessages, clearOpenedChat, getChats, setMessagesOffset } from '../../store/chats/actions'

const ChatNavbar = ({ navigation }) => {
  const dispatch = useDispatch()

  const firstName = navigation.getParam('chat').friend.firstName
  const lastName = navigation.getParam('chat').friend.lastName

  return (
    <View style={styles.navigation}>
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => {
          dispatch(clearOpenedChat())
          dispatch(clearMessages())
          dispatch(setMessagesOffset(0))
          dispatch(getChats({ showLoadingIndicator: false }))
          navigation.navigate('HomeScreen')
        }}
      >
        <IconBack height={28} width={28} />
      </TouchableOpacity>
      <Text style={styles.fullName}>
        {`${firstName} ${lastName}`}
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
    fontWeight: '500',
    marginLeft: 20
  },
})

export default ChatNavbar
