import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { logIn } from '../store/auth/authActions'

const AuthScreen = props => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Screen</Text>
      <TextInput
        style={styles.input}
        placeholder={'email'}
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder={'password'}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        onPress={() => dispatch(logIn({
          email,
          password,
          navigateHome: () => props.navigation.navigate('HomeScreen')
        }))}
      >
        <Text style={styles.loginButton}>Log in</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    marginBottom: 20
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 7,
    margin: 5,
    padding: 10
  },
  loginButton: {
    padding: 10
  }
})

export default AuthScreen
