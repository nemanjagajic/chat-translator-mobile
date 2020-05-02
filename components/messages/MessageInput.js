import React, { useState } from 'react'
import {StyleSheet, TextInput, TouchableOpacity, View, Platform} from 'react-native'
import Colors from '../../constants/Colors'
import {Ionicons} from '@expo/vector-icons'

const MessageInput = () => {
  const [value, setValue] = useState('')

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        style={[styles.input, {paddingTop: Platform.OS === 'ios' ? 15 : 10}]}
        multiline={true}
        placeholder={'Type a message'}
      />
      <TouchableOpacity
        style={styles.sendButton}
      >
        <Ionicons name="ios-send" size={30} color={value ? Colors.ACCENT : Colors.GRAY_100} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5,
    marginBottom: 25
  },
  input: {
    backgroundColor: Colors.WHITE_200,
    color: Colors.BLACK,
    padding: 10,
    flex: 1,
    minHeight: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    fontSize: 16,
    paddingRight: 50,
    display: 'flex',
    alignSelf: 'center',
  },
  sendButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
    position: 'absolute',
    right: 0
  }
})

export default MessageInput

