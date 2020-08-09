import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import AuthScreen from '../screens/AuthScreen'
import LoginScreen from '../screens/auth/LoginScreen'

const AuthStack = createStackNavigator({
  AuthScreen,
  LoginScreen
})

export default createAppContainer(AuthStack)

