import React from 'react'
import { useSelector } from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Colors from '../../constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import {logOut} from '../../store/auth/authActions'

const Drawer = props => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.auth.user)

  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>
        {activeUser && `${activeUser.firstName} ${activeUser.lastName}`}
      </Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('FriendsScreen')}
        style={styles.item}
      >
        <Ionicons name="md-people" size={28} color={Colors.BLACK} />
        <Text style={styles.itemText}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(logOut({
          navigateAuth: () => props.navigation.navigate('AuthScreen')
        }))}
        style={styles.logoutWrapper}
      >
        <Ionicons name="md-log-out" size={28} color={Colors.BLACK} />
        <Text style={styles.itemText}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.WHITE_100,
    paddingLeft: 30
  },
  fullName: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.BLACK,
    marginBottom: 40
  },
  logoutWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 30,
    width: '80%'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%'
  },
  itemText: {
    paddingLeft: 20,
    fontSize: 20,
    color: Colors.BLACK,
  }
})

export default Drawer
