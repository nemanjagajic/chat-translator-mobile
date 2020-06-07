import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'

const FriendsHeaderItem = ({ type, text, selected, setSelected }) => {
  return (
    <TouchableOpacity
      style={selected === type ? styles.headerItemActive : styles.headerItem}
      onPress={() => setSelected(type)}
    >
      <Text style={selected === type ? styles.headerTextActive : styles.headerText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerItem: {
    backgroundColor: Colors.WHITE_100,
    padding: 10,
    borderRadius: 20
  },
  headerText: {
    color: Colors.GRAY,
    fontSize: 15
  },
  headerItemActive: {
    backgroundColor: Colors.MAIN,
    padding: 10,
    borderRadius: 30
  },
  headerTextActive: {
    color: Colors.WHITE,
    fontSize: 15
  }
})

export default FriendsHeaderItem
