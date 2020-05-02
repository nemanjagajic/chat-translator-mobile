import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import defaultAvatar from '../../assets/defaultAvatar.png'


const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const friend = navigation.getParam('friend')

  return (
    <View style={styles.container}>

    </View>
  )
}

ChatScreen.navigationOptions = ({ navigation }) => ({
  title: null,
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
    <View style={styles.navigation}>
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => navigation.goBack()}
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
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullName: {
    fontSize: 20,
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

export default ChatScreen
