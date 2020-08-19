import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import { logOut } from '../../store/auth/actions'
import $t from '../../i18n'
import IconProfile from '../../assets/person-outline.svg'
import IconPeople from '../../assets/people-outline.svg'
import IconLogout from '../../assets/log-out-outline.svg'

const Drawer = props => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.auth.user)

  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>
        {activeUser && `${activeUser.firstName} ${activeUser.lastName}`}
      </Text>
      {/* In case we want to show profile screen in future */}
      {/*<TouchableOpacity*/}
      {/*  onPress={() => props.navigation.navigate('ProfileScreen')}*/}
      {/*  style={styles.item}*/}
      {/*>*/}
      {/*  <IconProfile height={28} width={28} />*/}
      {/*  <Text style={styles.itemText}>{$t('Drawer.profile')}</Text>*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('FriendsScreen')}
        style={[styles.item, styles.space]}
      >
        <IconPeople height={28} width={28} />
        <Text style={styles.itemText}>{$t('Drawer.friends')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(logOut({
          navigateAuth: () => props.navigation.navigate('AuthScreen')
        }))}
        style={styles.logoutWrapper}
      >
        <IconLogout height={28} width={28} />
        <Text style={styles.itemText}>{$t('Drawer.logOut')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.DRAWER_BACKGROUND,
    paddingLeft: 30
  },
  fullName: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.MAIN,
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
    width: '80%',
    paddingTop: 15,
    paddingBottom: 15
  },
  itemText: {
    paddingLeft: 20,
    fontSize: 18,
    color: Colors.BLACK
  },
  space: {
    marginTop: 10
  }
})

export default Drawer
