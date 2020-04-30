import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import AddFriendButton from '../components/buttons/AddFriendButton'
import SearchButton from '../components/buttons/SearchButton'
import $t from '../i18n'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyChat}>
        <Ionicons style={styles.emptyChatIcon} name="md-planet" size={72} color={Colors.MAIN_300} />
        <Text style={styles.emptyChatText}>{$t('Home.emptyChatDesc')}</Text>
      </View>
      <TouchableOpacity
        style={styles.newMessageButton}
      >
        <Ionicons name="ios-send" size={30} color={Colors.MAIN} />
      </TouchableOpacity>
    </View>
  )
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: $t('Home.headerTitle'),
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
    <TouchableOpacity
      style={styles.menuIcon}
      onPress={() => navigation.openDrawer()}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="ios-menu" size={28} color={Colors.MAIN} />
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
    backgroundColor: Colors.BACKGROUND
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
    fontSize: 14
  },
  newMessageButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.ACCENT,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 1
  }
})

export default HomeScreen
