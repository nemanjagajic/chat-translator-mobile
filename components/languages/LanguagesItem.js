import React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import Colors from '../../constants/Colors'

const LanguagesItem = ({ name, code, isLast, setLanguage }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => setLanguage({ name, code })}
    >
      <View style={[styles.container, { marginBottom: isLast ? 20 : 0 }]}>
        <Text style={styles.text}>{ name }</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.BLACK,
    textAlign: 'center'
  }
})

export default LanguagesItem
