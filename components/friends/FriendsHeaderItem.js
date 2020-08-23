import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'

const FriendsHeaderItem = ({ type, text, selected, setSelected, number }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected === type ? styles.headerItemActive : styles.headerItem]}
      onPress={() => setSelected(type)}
    >
      <Text style={selected === type ? styles.headerTextActive : styles.headerText}>
        {text}
      </Text>
      <View style={selected === type ? styles.numberSelected : styles.number}>
        <Text style={selected === type ? styles.numberTextSelected : styles.numberText}>{number}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '32%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerItem: {
    backgroundColor: Colors.WHITE_100,
    borderRadius: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7
  },
  headerItemActive: {
    backgroundColor: Colors.MAIN,
    borderRadius: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7
  },
  headerText: {
    color: Colors.GRAY,
    fontSize: 14
  },
  headerTextActive: {
    color: Colors.WHITE,
    fontSize: 14
  },
  number: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: Colors.GRAY_200,
    borderRadius: 50,
    minWidth: 28
  },
  numberSelected: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: Colors.MAIN_300,
    borderRadius: 50,
    minWidth: 28
  },
  numberText: {
    color: Colors.WHITE
  },
  numberTextSelected: {
    color: Colors.WHITE
  }
})

export default FriendsHeaderItem
