import React, { useEffect } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { setActiveUser } from '../store/auth/authActions'
import { useDispatch } from 'react-redux'

const AuthLoadingScreen = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    checkLoggedUser()
  }, [])

  const checkLoggedUser = async () => {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      dispatch(setActiveUser({
        user: JSON.parse(user),
        navigateHome: () => props.navigation.navigate('HomeScreen')
      }))
    } else {
      props.navigation.navigate('AuthScreen')
    }
  }

  return (
    <View style={styles.container}>
      <Text>Auth Loading Screen...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AuthLoadingScreen
