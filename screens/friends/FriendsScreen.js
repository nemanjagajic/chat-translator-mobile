import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import {Ionicons} from '@expo/vector-icons'

const FriendsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
    </View>
  )
}

FriendsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Friends',
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
      style={{ marginLeft: 15 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="md-arrow-back" size={28} color={Colors.MAIN} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND
  },
})

export default FriendsScreen
