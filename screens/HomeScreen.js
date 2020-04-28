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
        <Ionicons style={styles.emptyChatIcon} name="md-planet" size={72} color={Colors.MAIN} />
        <Text style={styles.emptyChatText}>You haven't chatted with anyone yet, feel free to add friends and start chatting!</Text>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(logOut({
          navigateAuth: () => props.navigation.navigate('AuthScreen')
        }))}
        style={styles.logoutButton}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

HomeScreen.navigationOptions = () => ({
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
    marginTop: 200
  },
  logoutButton: {
    padding: 10
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
    marginLeft: 40,
    marginRight: 40,
  },
  emptyChatIcon: {
    marginBottom: 10
  },
  emptyChatText: {
    textAlign: 'center',
    color: Colors.GRAY,
    fontWeight: '300',
    fontSize: 16
  }
})

export default HomeScreen
