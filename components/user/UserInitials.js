import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../../constants/Colors'

const UserInitials = ({ firstName, lastName, customStyles = null }) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Text style={styles.text}>{`${firstName && firstName[0]} ${lastName && lastName[0]}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 100,
    backgroundColor: Colors.WHITE_200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 14,
    color: Colors.MAIN,
    fontWeight: '500'
  }
})

export default UserInitials
