import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/auth/authActions'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import AddFriendButton from '../components/buttons/AddFriendButton'
import SearchButton from '../components/buttons/SearchButton'

const HomeScreen = props => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.emptyChat}>
        <Ionicons style={styles.emptyChatIcon} name="md-planet" size={72} color={Colors.MAIN_300} />
        <Text style={styles.emptyChatText}>You haven't chatted with anyone yet, feel free to add friends and start chatting!</Text>
      </View>
    </View>
  )
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Messages',
  headerStyle: {
    backgroundColor: Colors.MAIN
  },
  headerTitleStyle: {
    color: Colors.WHITE,
    fontSize: 20
  },
  headerLeft: () => (
    <TouchableOpacity
      style={styles.menuIcon}
      onPress={() => navigation.openDrawer()}
    >
      <Ionicons name="ios-menu" size={28} color={Colors.WHITE} />
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
    paddingTop: 200,
    backgroundColor: '#ffffff'
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
  },
  emptyChatIcon: {
    marginBottom: 10
  },
  emptyChatText: {
    textAlign: 'center',
    color: Colors.MAIN_300,
    fontWeight: '400',
    fontSize: 16
  }
})

export default HomeScreen
