import React, { useEffect } from 'react'
import {View, Text, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native'
import { setActiveUser } from '../store/auth/actions'
import { useDispatch } from 'react-redux'
import Colors from '../constants/Colors'

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
        navigateHome: () => props.navigation.navigate('Home')
      }))
    } else {
      props.navigation.navigate('AuthStack')
    }
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.indicator} size='large' color={Colors.ACCENT} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    marginTop: 138
  }
})

export default AuthLoadingScreen
